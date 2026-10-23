// Live state → characters. Reads the agents-live JSON written by opencode-project-template
// (tools/task-dashboard/agent-live.mjs): {updatedAt, agents:[{agent, role, phase, task, title, worktree, since}]}.
// Agent ids are generic ("builder-1", "reviewer-2", "merger"), so each one is mapped to one of our 15
// characters by role. Only two states exist: a character WORKS when at least one agent mapped to it is in
// the file with phase ≠ "idle"; otherwise it is IDLE.

export type LiveAgent={agent:string;role?:string;phase?:string;task?:string|null;title?:string|null;since?:string};
export type LiveFile={updatedAt?:string;agents?:LiveAgent[];missing?:boolean};

export const BUILDERS=['nova','orion','lyra','vega','atlas','comet'];
export const REVIEWERS=['sage','iris','juno','echo'];
export const ALL_CHARACTERS=[...BUILDERS,...REVIEWERS,'eve','theo','oracle','pixel','sherlock'];

// role → fixed character (pools handled separately). Roles beyond agent-live.mjs's four
// (builder|reviewer|merger|dispatcher) are mapped too, for when the pipeline starts writing them.
const ROLE_CHARACTER:Record<string,string>={
  merger:'eve',
  dispatcher:'theo',loop:'theo',brainstorm:'theo',graph:'theo','change-request':'theo',devops:'theo',rollback:'theo',
  'spec-init':'oracle','spec-validator':'oracle','spec-publisher':'oracle',
  design:'pixel',
  'error-analyzer':'sherlock','bug-check':'sherlock',
  'context-manager':'theo',
};
// Old engine names (19-character roster) still map straight to a character.
const NAME_CHARACTER:Record<string,string>={
  captain:'theo',muse:'theo',cartographer:'theo',scout:'oracle',herald:'oracle',
  ...Object.fromEntries(ALL_CHARACTERS.map(c=>[c,c])),
};
const poolOf=(role:string)=>role==='builder'||role==='builder-strong'?BUILDERS:role==='reviewer'?REVIEWERS:null;

export type Cast={character:string;agents:LiveAgent[]};

// Keeps agent → character assignments stable across polls (builder-1 stays Nova while it lives). An agent
// that comes back within REMEMBER_MS (e.g. builder-2 fixing a review FAIL in round 2) gets its old character
// again when that one is free.
const REMEMBER_MS=120000;
export class LiveMapper{
  sticky=new Map<string,string>();
  recent=new Map<string,{character:string;at:number}>();
  map(file:LiveFile,now=Date.now()):Map<string,Cast>{
    const out=new Map<string,Cast>();
    const agents=(file.agents??[]).filter(a=>a&&typeof a.agent==='string'&&a.agent&&a.phase!=='idle');
    const live=new Set(agents.map(a=>a.agent));
    for(const [id,character] of [...this.sticky])if(!live.has(id)){this.sticky.delete(id);this.recent.set(id,{character,at:now})}
    for(const [id,r] of [...this.recent])if(now-r.at>REMEMBER_MS)this.recent.delete(id);
    const add=(character:string,a:LiveAgent)=>{
      const c=out.get(character)??{character,agents:[]};c.agents.push(a);out.set(character,c);
    };
    const pending:LiveAgent[]=[];
    for(const a of agents){
      const byName=NAME_CHARACTER[a.agent.toLowerCase()];
      if(byName){add(byName,a);continue}
      const role=(a.role??'').toLowerCase();
      const fixed=ROLE_CHARACTER[role];
      if(fixed){add(fixed,a);continue}
      if(poolOf(role))pending.push(a);
      else add('theo',a);
    }
    // Pool roles. Numbered ids are FIXED (anh chốt 23/10): builder-1..6 → Nova, Orion, Lyra, Vega, Atlas, Comet;
    // reviewer-1..4 → Sage, Iris, Juno, Echo (the loop pairs reviewer-n with builder-n, so reviewer-5/6 wrap to
    // Sage/Iris and share that sprite if it is busy). Ids without a number fall back to the first free character.
    pending.sort((a,b)=>a.agent.localeCompare(b.agent,undefined,{numeric:true}));
    for(const a of pending){
      const pool=poolOf((a.role??'').toLowerCase())!;
      const n=Number(/-(\d+)$/.exec(a.agent)?.[1]);
      if(n>=1){const character=pool[(n-1)%pool.length];this.sticky.set(a.agent,character);add(character,a);continue}
      let character=this.sticky.get(a.agent);
      const taken=new Set([...this.sticky.entries()].filter(([id])=>id!==a.agent).map(([,c])=>c));
      const free=(c:string)=>pool.includes(c)&&!taken.has(c)&&!out.has(c);
      if(!character||!pool.includes(character)){
        const back=this.recent.get(a.agent)?.character;
        character=back&&free(back)?back:pool.find(free);
      }
      // More agents than characters: share the last character (still shown once).
      character??=pool[pool.length-1];
      this.sticky.set(a.agent,character);
      add(character,a);
    }
    return out;
  }
}
