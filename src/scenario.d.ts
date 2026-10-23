import type {LiveAgent} from './live-state';
export type ScenarioProgress={projectName?:string;currentLayer?:number;totalLayers?:number;tasks:{task:string;title?:string}[];
  completedTasks:{task:string;review?:string;round?:number;completedAt?:string}[];blockedTasks:{task:string;reason?:string;since?:string}[];inProgressTask?:string|null};
export type ScenarioEvent={t:number;op:'enter'|'leave'|'clear'|'note'|'progress';agent?:string;role?:string;phase?:string;
  task?:string|null;title?:string|null;note?:string;fn?:(p:ScenarioProgress)=>void};
export type ScenarioState={agents:LiveAgent[];progress:ScenarioProgress;note:string};
export function buildScenario(stretch?:number):{events:ScenarioEvent[];length:number};
export function createState():ScenarioState;
export function applyEvent(s:ScenarioState,e:ScenarioEvent):void;
