#!/usr/bin/env node
// Dummy scenario: plays the opencode-project-template pipeline ("How it works") by writing the same file the
// real loop writes — `.context/agents-live.json` via tools/task-dashboard/agent-live.mjs:
//   {updatedAt, agents:[{agent, role, phase, task, title, since}]}   (enter = upsert, leave = remove)
// Steps: /start → spec-init → spec-validator → brainstorm → design → graph → loop per layer (dispatcher plans,
// builders in parallel worktrees, error-analyzer on a failing task, reviewers, merge, phase validation,
// human checkpoint) → after the build a /change (change-request → spec-publisher → builder → reviewer → validator).
// Roles beyond agent-live.mjs's four (builder|reviewer|merger|dispatcher) are written too; the studio maps them.
//
// Usage: node scripts/dummy-scenario.mjs [--speed 1] [--once] [--file <path>]
//   file defaults to studio.config.json → stateFile (same file the studio page reads).
import {writeFileSync,renameSync,mkdirSync,readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),opt=k=>{const i=args.indexOf(`--${k}`);return i<0?undefined:args[i+1]??true};
let cfg={};try{cfg=JSON.parse(readFileSync(resolve(root,'studio.config.json'),'utf8'))}catch{}
const file=resolve(root,opt('file')??process.env.STATE_FILE??cfg.stateFile??'.context/agents-live.json');
const speed=Number(opt('speed')??1),once=args.includes('--once');

// ── timeline: [seconds, 'enter'|'leave'|'clear', agent, role, phase, task, title, note] ─────────────────
const T=[];let t=0;
const at=(dt,...ev)=>{t+=dt;T.push([t,...ev])};
const enter=(dt,agent,role,phase,task,title,note)=>at(dt,'enter',agent,role,phase,task,title,note);
const leave=(dt,agent,note)=>at(dt,'leave',agent,null,null,null,null,note);
const clear=(dt,note)=>at(dt,'clear',null,null,null,null,null,note);
const L1=[['layer-1/task-01','DB schema + migrations'],['layer-1/task-02','REST API /users'],['layer-1/task-03','Auth middleware (JWT)'],['layer-1/task-04','Login page UI']];
const L2=[['layer-2/task-01','Dashboard layout'],['layer-2/task-02','Customer list + filters'],['layer-2/task-03','Customer detail page'],['layer-2/task-04','Deals pipeline (kanban)'],['layer-2/task-05','Email notifications'],['layer-2/task-06','Audit log API']];

clear(0,'/start — văn phòng trống');
// 1. Read spec: no spec yet → spec-init, then spec-validator must PASS
enter(3,'spec-init','spec-init','building',null,'Đọc code → SPECIFICATIONS.md','1a spec-init');
leave(8,'spec-init');
enter(0,'spec-validator','spec-validator','review',null,'Validate spec vs code','1b spec-validator');
leave(6,'spec-validator','⏸ validator PASS');
// 2. Brainstorm (prompt-level, main session) → design doc + config
enter(3,'brainstorm','brainstorm','orchestrating',null,'Design doc + project-config','2 brainstorm');
leave(8,'brainstorm','⏸ approve design');
// 3. Design tokens + screen specs
enter(3,'design','design','building',null,'Design tokens + screen specs','3 design');
leave(10,'design','⏸ confirm tokens');
// 4. Graph: split into layers/tasks
enter(3,'graph','graph','orchestrating',null,'Layer plan: 2 layers, 10 tasks','4 graph');
leave(7,'graph','⏸ approve plan');

function layer(n,tasks,failing){
  enter(3,'dispatcher','dispatcher','orchestrating',null,`plan --layer ${n} → parallel waves`,`Loop layer ${n}: dispatcher plan`);
  // builders start in parallel (staggered setup of worktrees)
  tasks.forEach(([task,title],i)=>enter(i?1:2,`builder-${i+1}`,'builder','building',task,title,i?undefined:`5a ${tasks.length} builder song song`));
  // the failing task: observe FAIL → error-analyzer → fix → retry
  enter(8,'error-analyzer','error-analyzer','building',tasks[failing][0],`Root cause: ${tasks[failing][1]}`,'5c error-analyzer');
  leave(7,'error-analyzer','retry PASS');
  // builders finish one by one → independent reviewer takes the task
  tasks.forEach(([task,title],i)=>{
    leave(i===failing?4:2,`builder-${i+1}`);
    enter(0,`reviewer-${(i%4)+1}`,'reviewer','review',task,title,i?undefined:'5d reviewer');
  });
  // reviewers PASS and release
  for(let i=0;i<Math.min(4,tasks.length);i++)leave(i?3:6,`reviewer-${i+1}`);
  // merge: dispatcher integrates the task branches, Eve shows the merge step
  enter(2,'merger','merger','merging',null,`Merge layer-${n} branches`,'5e merge');
  leave(9,'merger');
  leave(0,'dispatcher');
  // end of layer: phase validation, then the human checkpoint (everyone idle)
  enter(2,'spec-validator','spec-validator','review',null,`Phase review layer ${n}`,'5g spec-validator');
  leave(6,'spec-validator');
  clear(0,`⏸ checkpoint layer ${n} — chờ approve`);
}
layer(1,L1,2);
t+=8;
layer(2,L2,4);
t+=8;
// After the build: a change request goes through change-request → spec-publisher → loop → validator
enter(0,'change-request','change-request','orchestrating','phase-1-task-01','CR: thêm export CSV','/change — change-request');
enter(4,'spec-publisher','spec-publisher','building',null,'Spec delta + test-scope','spec-publisher');
leave(5,'spec-publisher');
enter(0,'builder-1','builder','building','phase-1-task-01','Export CSV');
leave(9,'builder-1');
enter(0,'reviewer-1','reviewer','review','phase-1-task-01','Export CSV');
leave(6,'reviewer-1');
enter(0,'spec-validator','spec-validator','review',null,'Phase close CR','spec-validator');
leave(5,'spec-validator');
leave(0,'change-request');
clear(1,'xong — cả team nghỉ');
const LENGTH=t+10;

// ── writer (atomic: tmp + rename, like agent-live.mjs) ──────────────────────────────────────────────────
let agents=[];
function write(){
  mkdirSync(dirname(file),{recursive:true});
  const tmp=`${file}.tmp-${process.pid}`;
  writeFileSync(tmp,`${JSON.stringify({updatedAt:new Date().toISOString(),agents},null,2)}\n`);
  renameSync(tmp,file);
}
function apply([,op,agent,role,phase,task,title,note]){
  if(op==='clear')agents=[];
  else if(op==='leave')agents=agents.filter(a=>a.agent!==agent);
  else{
    const prev=agents.find(a=>a.agent===agent);
    const e={agent,role,phase};if(task)e.task=task;if(title)e.title=title;
    e.since=prev&&prev.task===task&&prev.phase===phase?prev.since:new Date().toISOString();
    agents=[...agents.filter(a=>a.agent!==agent),e].sort((a,b)=>a.agent.localeCompare(b.agent,undefined,{numeric:true}));
  }
  write();
  const who=agents.map(a=>a.agent).join(', ')||'—';
  console.log(`${String(Math.round(t0s())).padStart(4)}s ${note?`▶ ${note.padEnd(34)}`:' '.repeat(36)} ${op.padEnd(5)} ${agent??''}  | active: ${who}`);
}
let start=Date.now();const t0s=()=>(Date.now()-start)/1000;
console.log(`dummy scenario → ${file} (speed ×${speed}, ${Math.round(LENGTH/speed)} s/vòng)${once?'':', lặp vô hạn — Ctrl+C để dừng'}`);
async function run(){
  for(;;){
    start=Date.now();
    for(const ev of T){
      const wait=ev[0]/speed*1000-(Date.now()-start);
      if(wait>0)await new Promise(r=>setTimeout(r,wait));
      apply(ev);
    }
    await new Promise(r=>setTimeout(r,(LENGTH-t)/speed*1000+3000/speed));
    if(once)break;
    console.log('— lặp lại từ đầu —');
  }
}
run();
