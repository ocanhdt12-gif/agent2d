// Where the studio's live data comes from. Both the scene (coding-test.ts) and the dashboard read through here:
//   file   — /state.json + /progress.json served by the dev server (the real project's JSON files)
//   demo   — the full-flow scenario (src/scenario.js) played in the browser, looping
//   random — one random snapshot of the whole office (who works, on what, how far the project is)
import {buildScenario,createState,applyEvent,type ScenarioState} from './scenario.js';
import {type LiveFile} from './live-state';

export type Mode='file'|'demo'|'random';
export type ProgressFile={missing?:boolean;projectName?:string;currentLayer?:number;totalLayers?:number;tasks?:{task:string;title?:string}[];
  completedTasks?:{task:string;review?:string;round?:number}[];blockedTasks?:{task:string;reason?:string}[]};

const DEMO_SPEED=3;   // ×3 → one loop ≈ 6.5 minutes (faster and characters barely sit before the next step)
let mode:Mode='file';
let demo:{state:ScenarioState;start:number;next:number;events:ReturnType<typeof buildScenario>}|null=null;
let random:ScenarioState|null=null;
const listeners=new Set<(m:Mode)=>void>();

export const getMode=()=>mode;
export const onModeChange=(fn:(m:Mode)=>void)=>{listeners.add(fn)};
export function setMode(m:Mode){
  mode=m;demo=null;
  if(m==='demo')demo={state:createState(),start:performance.now(),next:0,events:buildScenario()};
  if(m==='random')random=randomOffice();
  for(const fn of listeners)fn(m);
}
// "Random" again while already random → a new snapshot.
export function reroll(){random=randomOffice();for(const fn of listeners)fn(mode)}

function stepDemo(){
  if(!demo)return;
  const {events,length}=demo.events;
  let el=(performance.now()-demo.start)/1000*DEMO_SPEED;
  if(el>=length){demo.state=createState();demo.next=0;demo.start=performance.now();el=0}
  while(demo.next<events.length&&events[demo.next].t<=el)applyEvent(demo.state,events[demo.next++]);
}
// Seconds into the demo loop / loop length (for the progress readout).
export function demoClock(){
  if(!demo)return null;
  return {at:(performance.now()-demo.start)/1000*DEMO_SPEED,length:demo.events.length,note:demo.state.note};
}

export async function readState():Promise<LiveFile&{pollMs?:number;file?:string}>{
  if(mode==='demo'){stepDemo();return {updatedAt:new Date().toISOString(),agents:demo!.state.agents}}
  if(mode==='random')return {updatedAt:new Date().toISOString(),agents:random!.agents};
  return (await fetch('/state.json',{cache:'no-store'})).json();
}
export async function readProgress():Promise<ProgressFile>{
  if(mode==='demo'){stepDemo();return demo!.state.progress}
  if(mode==='random')return random!.progress;
  return (await fetch('/progress.json',{cache:'no-store'})).json();
}

// ── random office ──────────────────────────────────────────────────────────────────────────────────
const pick=<T,>(a:T[])=>a[Math.floor(Math.random()*a.length)];
const shuffle=<T,>(a:T[])=>a.map(v=>[Math.random(),v] as const).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const SUPPORT:[string,string,string][]=[   // [role, phase, title]
  ['merger','merging','merge → layer integration'],['dispatcher','orchestrating','plan parallel waves'],
  ['spec-validator','review','Validate spec vs code'],['design','building','Design tokens + screen specs'],
  ['error-analyzer','building','Root cause: test FAIL'],
];
function randomOffice():ScenarioState{
  // tasks of the scenario's plan, grouped by layer
  const plan=createState();
  for(const e of buildScenario(1).events)if(e.op==='progress'){applyEvent(plan,e);if(plan.progress.tasks.length>=14)break}
  const tasks=plan.progress.tasks.filter(t=>t.task.startsWith('layer-'));
  const layerOf=(t:string)=>Number(/layer-(\d+)/.exec(t)?.[1]??0);
  const totalLayers=Math.max(...tasks.map(t=>layerOf(t.task)))+1,currentLayer=Math.floor(Math.random()*totalLayers);
  const done=tasks.filter(t=>layerOf(t.task)<currentLayer||(layerOf(t.task)===currentLayer&&Math.random()<0.3));
  const open=shuffle(tasks.filter(t=>!done.includes(t)));
  const blocked=open.length>3&&Math.random()<0.4?[open.pop()!]:[];
  const since=()=>new Date(Date.now()-Math.random()*15*60000).toISOString();
  const agents:ScenarioState['agents']=[];
  const nb=Math.floor(Math.random()*7),nr=Math.floor(Math.random()*5);
  for(let i=1;i<=nb&&open.length;i++){const t=open.pop()!;agents.push({agent:`builder-${i}`,role:'builder',phase:'building',task:t.task,title:t.title,since:since()})}
  for(let i=1;i<=nr&&open.length;i++){const t=open.pop()!;agents.push({agent:`reviewer-${i}`,role:'reviewer',phase:'review',task:t.task,title:t.title,since:since()})}
  for(const [role,phase,title] of SUPPORT)if(Math.random()<0.45)agents.push({agent:role,role,phase,title,since:since()});
  return {agents,note:'',progress:{projectName:pick(['acme-crm','pixel-shop','nova-bank','orbit-hr']),currentLayer,totalLayers,tasks,
    completedTasks:done.map(t=>({task:t.task,review:'STRICT PASS',round:1})),
    blockedTasks:blocked.map(t=>({task:t.task,reason:pick(['Chờ API key','Thiếu spec','Dependency chưa merge'])}))}};
}
