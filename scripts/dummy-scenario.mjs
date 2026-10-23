#!/usr/bin/env node
// Dummy scenario — the FULL opencode-project-template flow ("How it works" + .agent/loop.md), written to the
// same display file the real loop writes: `.context/agents-live.json` (agent-live.mjs format)
//   {updatedAt, agents:[{agent, role, phase, task?, title?, since}]}   enter = upsert · leave = remove · clear
//
//  0  /start: spec-init → spec-validator FAIL → clarify → re-validate PASS ⏸
//     brainstorm ⏸ → design ⏸ → graph ⏸
//  L0 devops git init + CI · 2 builders → reviewers → merge → checkpoint
//  L1 wave 1 (3 builders) + wave 2 (1 dependent task): review FAIL → round 2, a task BLOCKED after
//     3 error-analyzer retries, merge conflict → error-analyzer on the integration branch, CI check
//  L2 6 builders in parallel (one hard task on builder-strong), reviewers, merge, phase validation
//  L3 final layer + devops deploy: staging health check FAILS → rollback → fix → deploy prod
//  maintenance: /bug-check (read-only sweep) → /bug (BUG: root cause first) → /feature (ADDITIVE)
//  then everyone idle (an agent left with phase "idle" counts as idle too) and the loop restarts.
// Roles beyond agent-live.mjs's four (builder|reviewer|merger|dispatcher) are written too; the studio maps them.
//
// Usage: node scripts/dummy-scenario.mjs [--speed 1] [--stretch 2.5] [--once] [--file <path>]
//   --stretch: multiplies every task/step duration (default 2.5 = each task ~2.5× longer than the base timeline)
//   file defaults to studio.config.json → stateFile (the same file the studio page reads).
import {writeFileSync,renameSync,mkdirSync,readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildScenario,createState,applyEvent} from '../src/scenario.js';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),opt=k=>{const i=args.indexOf(`--${k}`);return i<0?undefined:args[i+1]??true};
let cfg={};try{cfg=JSON.parse(readFileSync(resolve(root,'studio.config.json'),'utf8'))}catch{}
const file=resolve(root,opt('file')??process.env.STATE_FILE??cfg.stateFile??'.context/agents-live.json');
// progress.json (layers + completed/blocked tasks) for the task board; same format as the template's
// progress-write.mjs, plus a `tasks` list of the planned tasks (extension so the board can show TODO).
const progressFile=resolve(root,opt('progress')??process.env.PROGRESS_FILE??cfg.progressFile??resolve(dirname(file),'progress.json'));
const speed=Number(opt('speed')??1),once=args.includes('--once');
// Every wait in the timeline is multiplied by STRETCH so each task lasts longer (anh: "lâu hơn chút", 23/10).
const STRETCH=Number(opt('stretch')??2.5);

// Timeline lives in src/scenario.js (shared with the studio's DEMO button).
const {events:T,length:LENGTH}=buildScenario(STRETCH);


// ── writer (atomic tmp + rename, like agent-live.mjs) ──────────────────────────────────────────────
let state=createState(),start=Date.now();
function writeProgress(){
  mkdirSync(dirname(progressFile),{recursive:true});
  const tmp=`${progressFile}.tmp-${process.pid}`;
  writeFileSync(tmp,`${JSON.stringify({...state.progress,lastUpdated:new Date().toISOString()},null,2)}\n`);
  renameSync(tmp,progressFile);
}
const elapsed=()=>(Date.now()-start)/1000*speed;
function write(){
  mkdirSync(dirname(file),{recursive:true});
  const tmp=`${file}.tmp-${process.pid}`;
  writeFileSync(tmp,`${JSON.stringify({updatedAt:new Date().toISOString(),agents:state.agents},null,2)}\n`);
  renameSync(tmp,file);
}
function apply(e){
  applyEvent(state,e);
  if(e.op==='progress'){writeProgress();if(!e.note)return}
  if(e.op!=='note'&&e.op!=='progress')write();
  const act=state.agents.filter(a=>a.phase!=='idle').map(a=>a.agent).join(', ')||'— (cả team nghỉ)';
  const head=e.note?`▶ ${e.note}`:'';
  const what=e.op==='note'||e.op==='progress'?'':`${e.op} ${e.agent??''}`.trim();
  console.log(`${String(Math.round(elapsed())).padStart(4)}s  ${head}${head&&what?'  · ':''}${what}${e.op==='note'||e.op==='progress'?'':`   [đang làm: ${act}]`}`);
}
console.log(`dummy scenario → ${file}\nspeed ×${speed} · ${Math.round(LENGTH/speed)} s/vòng${once?'':' · lặp vô hạn — Ctrl+C để dừng'}\n`);
async function run(){
  for(;;){
    start=Date.now();
    for(const e of T){
      const wait=e.t/speed*1000-(Date.now()-start);
      if(wait>0)await new Promise(r=>setTimeout(r,wait));
      apply(e);
    }
    await new Promise(r=>setTimeout(r,(LENGTH-T.at(-1).t)/speed*1000));
    if(once)break;
    console.log('\n— lặp lại từ đầu —\n');
  }
}
run();
