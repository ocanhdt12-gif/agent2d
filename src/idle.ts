// Idle agents: an agent with no work takes a break. Every stay it picks one of the two break zones at random
// (Cafe or Lounge), then a random free slot inside it. Each slot has its own rest activities (pose + small
// effect: steam, music notes, Zzz, phone game…) and friends sharing a table/sofa interact (chat, cheers,
// laugh, selfie, poking a sleeper). No walking: the agent fades out and in at the next slot.
// Each slot holds one agent; slots closer than BLOCK_RADIUS or listed in `conflicts` (including work seats
// registered as blockers, e.g. 'P' = Pixel's sofa desk) block each other, so sprites never overlap.
import {Container,Graphics,Sprite,Text,type Texture} from 'pixi.js';
import {iconSprite,setIcon} from './pixel-icons';

export type IdleManifest={scale:number;poses:Record<string,{file:string;width:number;height:number;anchorX:number;anchorY:number}>};
export type IdleCast={name:string;manifest:IdleManifest;textures:Record<string,Texture>};

type Zone='cafe'|'lounge';
// Rest effect drawn around the agent while an activity runs.
type Fx='steam'|'sigh'|'brew'|'music'|'game'|'scroll'|'zzz'|'view'|'water';
type Act={pose:string;w:number;min:number;max:number;fx:Fx};
type Interaction='chat'|'cheers'|'laugh'|'selfie'|'poke';
export type IdleSlot={id:string;x:number;y:number;zone:Zone;flip:boolean;acts:Act[];
  // counter: play the acts in order (brew, then drink) instead of at random
  seq?:boolean;
  // pose used to chat when a friend sits in the same `group`, and the interactions that group allows
  talk?:string;group?:string;together?:Interaction[];conflicts?:string[]};

const act=(pose:string,w:number,min:number,max:number,fx:Fx):Act=>({pose,w,min,max,fx});
const TABLE:Interaction[]=['chat','chat','cheers'];
const SOFA:Interaction[]=['chat','laugh','selfie'];
const POUFS:Interaction[]=['chat','laugh','poke'];

// Floor contact of each slot on office_original.png (1496x1051), tuned one by one on zoomed renders (22/10):
// cafe chair sprites cover the painted chairs; lounge sprites sit inside the cushions, not on the front edge.
export const IDLE_SLOTS:IdleSlot[]=[
  // coffee counter: brew, then drink
  {id:'C5',x:240,y:302,zone:'cafe',flip:false,seq:true,acts:[act('stand_brew',1,4,6,'brew'),act('stand_drink',1,5,8,'steam')]},
  // cafe table A: both front chairs, side by side with their backs to the viewer, facing the table
  // (C1 looks up-right, C2 mirrored looks up-left). Table B: C3 back to the viewer and C4 on the far chair
  // facing out, face to face across the table (re-placed 22/10 — a front-facing C2 sat with its back to the table).
  {id:'C2',x:250,y:436,zone:'cafe',flip:true,group:'tableA',talk:'chair_back_talk',together:TABLE,
    acts:[act('chair_back_drink',60,6,10,'steam'),act('chair_back_drink',40,4,7,'sigh')]},
  {id:'C1',x:188,y:425,zone:'cafe',flip:false,group:'tableA',talk:'chair_back_talk',together:TABLE,
    acts:[act('chair_back_drink',60,6,10,'steam'),act('chair_back_drink',40,4,7,'sigh')]},
  {id:'C4',x:418,y:334,zone:'cafe',flip:true,group:'tableB',talk:'chair_front_talk',together:TABLE,
    acts:[act('chair_front_drink',60,6,10,'steam'),act('chair_front_drink',40,4,7,'sigh')]},
  {id:'C3',x:345,y:356,zone:'cafe',flip:false,group:'tableB',talk:'chair_back_talk',together:TABLE,
    acts:[act('chair_back_drink',60,6,10,'steam'),act('chair_back_drink',40,4,7,'sigh')]},
  // lounge: L-sofa, two poufs, loveseat, water cooler
  {id:'R2',x:1268,y:782,zone:'lounge',flip:false,group:'sofa',talk:'sit_laugh',together:SOFA,
    acts:[act('sit_drink',35,5,9,'steam'),act('sit_relax',35,6,10,'music'),act('sit_phone',30,6,10,'game')]},
  {id:'R1',x:1162,y:795,zone:'lounge',flip:false,group:'sofa',talk:'sit_laugh',together:SOFA,conflicts:['P'],
    acts:[act('sit_relax',40,6,10,'music'),act('sit_phone',35,6,10,'scroll'),act('sit_drink',25,5,9,'steam')]},
  {id:'R3',x:1335,y:803,zone:'lounge',flip:true,group:'sofa',talk:'sit_laugh',together:SOFA,
    acts:[act('sit_phone',35,6,10,'game'),act('sit_phone',25,6,10,'scroll'),act('sit_relax',40,6,10,'music')]},
  {id:'R6',x:1152,y:888,zone:'lounge',flip:false,group:'poufs',talk:'sit_laugh',together:POUFS,
    acts:[act('sit_doze',60,10,16,'zzz'),act('sit_relax',40,6,10,'music')]},
  {id:'R5',x:1080,y:858,zone:'lounge',flip:false,group:'poufs',talk:'sit_laugh',together:POUFS,
    acts:[act('sit_relax',40,6,10,'music'),act('sit_phone',35,6,10,'game'),act('sit_doze',25,8,12,'zzz')]},
  {id:'R7',x:1336,y:928,zone:'lounge',flip:false,acts:[act('sit_back',1,8,14,'view')]},
  {id:'R8',x:1420,y:918,zone:'lounge',flip:true,acts:[act('stand_drink',1,5,9,'water')]},
];
const ZONES:Zone[]=['cafe','lounge'];
const BLOCK_RADIUS=40;
// Seconds spent in one slot before moving on (the counter is a quick stop: brew + one sip).
const STAY:[number,number]=[18,35];
const COUNTER_STAY:[number,number]=[9,14];
const INTERACT_CHANCE=0.4;
const INTERACT_SECONDS:Record<Interaction,[number,number]>={chat:[3,6],cheers:[3,3.4],laugh:[2.6,4],selfie:[3.2,3.6],poke:[3,3.4]};

const TALK_POSES=new Set(['chair_front_talk','chair_back_talk','sit_laugh']);
const BREATH_POSES=new Set(['sit_relax','sit_doze','sit_back']);
const CHAT_ICONS=['chat','laugh','heart','coffee','star','sparkle','note'];
const FADE_MS=300;
const rand=(a:number,b:number)=>a+Math.random()*(b-a);
const any=<T>(items:T[])=>items[Math.floor(Math.random()*items.length)];
const pick=<T>(items:[T,number][])=>{let r=Math.random()*items.reduce((s,[,w])=>s+w,0);for(const [it,w] of items)if((r-=w)<0)return it;return items[0][0]};
const label=(text:string,fill:string,size:number)=>{
  const t=new Text({resolution:3,text,style:{fontFamily:'"Nunito","Trebuchet MS",sans-serif',fontSize:size,fontWeight:'900',fill,stroke:{color:'#16223a',width:3}}});
  t.anchor.set(.5);return t;
};

// ONE CHARACTER, ONE SPRITE: in the real scene a character is either working at its seat or idling here,
// never both and never twice. `isWorking` is wired to the work seats; only test clones (clone=true) may
// share a character.
export class IdleWorld{
  owner=new Map<string,IdleAgent>();
  isWorking:(name:string)=>boolean=()=>false;
  // Work seats that block nearby idle slots while someone works there.
  blockers:{id:string;x:number;y:number;active:()=>boolean}[]=[];
  agents:IdleAgent[]=[];
  constructor(public layer:Container){}
  free(slot:IdleSlot,except?:IdleAgent){
    const holder=this.owner.get(slot.id);
    if(holder&&holder!==except)return false;
    for(const [id,a] of this.owner){
      if(a===except||id===slot.id)continue;
      const s=IDLE_SLOTS.find(s=>s.id===id)!;
      if(slot.conflicts?.includes(id)||Math.hypot(s.x-slot.x,s.y-slot.y)<BLOCK_RADIUS)return false;
    }
    return this.blockers.every(b=>!b.active()||(!slot.conflicts?.includes(b.id)&&Math.hypot(b.x-slot.x,b.y-slot.y)>=BLOCK_RADIUS));
  }
  // A random free slot of a random zone (the other zone if the first is full); never the current slot.
  claim(agent:IdleAgent){
    const zones=Math.random()<.5?ZONES:[...ZONES].reverse();
    for(const zone of zones){
      const open=IDLE_SLOTS.filter(s=>s.zone===zone&&s.id!==agent.slot?.id&&this.free(s,agent));
      if(!open.length)continue;
      const slot=any(open);
      this.release(agent);
      this.owner.set(slot.id,agent);
      return slot;
    }
    return null;
  }
  release(agent:IdleAgent){if(agent.slot&&this.owner.get(agent.slot.id)===agent)this.owner.delete(agent.slot.id)}
  // A friend in the same table/sofa group.
  mate(agent:IdleAgent){
    const g=agent.slot?.group;if(!g)return null;
    return this.agents.find(a=>a!==agent&&a.active&&!a.fadingOut&&a.slot?.group===g)??null;
  }
  // The real (non-clone) idle agent of a character, if any.
  agentOf(name:string){return this.agents.find(a=>!a.clone&&a.cast.name===name)}
  // A character got work: its idle sprite leaves immediately.
  leave(name:string){for(const a of this.agents)if(a.cast.name===name&&!a.clone&&a.active)a.stop()}
  update(now:number,dt:number){for(const a of this.agents)a.update(now,dt)}
}

export class IdleAgent{
  root=new Container();
  sprite=new Sprite();
  fx=new Container();
  icon=iconSprite('chat',16);
  bubble=new Container();
  slot:IdleSlot|null=null;
  active=false;
  pose='';
  act:Act|null=null;
  actIndex=0;
  until=0;
  leaveAt=0;
  fade=1;
  fadingOut=false;
  particleClock=0;
  // Interaction this agent leads (`partner` follows along) or joins (`leader` set).
  together:{kind:Interaction;partner:IdleAgent;start:number;stage:number}|null=null;
  leader:IdleAgent|null=null;
  constructor(public world:IdleWorld,public cast:IdleCast,public clone=false){
    if(!clone&&world.agentOf(cast.name))throw new Error(`idle agent for ${cast.name} already exists`);
    this.bubble.addChild(new Graphics().roundRect(-13,-12,26,22,7).fill('#ffffff').stroke({color:'#16223a',width:2}).poly([-4,10,4,10,-2,16]).fill('#ffffff'),this.icon);
    this.bubble.visible=false;
    this.root.addChild(this.sprite,this.fx,this.bubble);
    this.root.visible=false;
    world.layer.addChild(this.root);world.agents.push(this);
  }
  get head(){return this.sprite.height}
  get flip(){return this.slot?.flip?-1:1}
  // Start the break in a random zone and slot.
  start(now:number){
    if(this.active)return true;
    if(!this.clone&&this.world.isWorking(this.cast.name))return false;
    const slot=this.world.claim(this);
    if(!slot)return false;
    this.active=true;this.place(slot,now);this.root.visible=true;this.fade=0;this.fadingOut=false;
    return true;
  }
  stop(){this.endTogether();this.active=false;this.world.release(this);this.slot=null;this.root.visible=false;this.fx.removeChildren();this.bubble.visible=false}
  place(slot:IdleSlot,now:number){
    this.slot=slot;
    this.root.position.set(slot.x,slot.y);this.root.zIndex=slot.y;
    const [min,max]=slot.seq?COUNTER_STAY:STAY;
    this.leaveAt=now+rand(min,max)*1000;
    this.actIndex=-1;this.act=null;
    this.choose(now);
    // A friend already sitting here waves hello.
    const mate=this.world.mate(this);
    if(mate)mate.pop(any(['heart_v','chat','sparkle']),14,mate.flip*14,-mate.head-6);
  }
  show(pose:string){
    const p=this.cast.manifest.poses[pose],s=this.cast.manifest.scale;
    this.sprite.texture=this.cast.textures[pose];
    this.sprite.anchor.set(p.anchorX/p.width,p.anchorY/p.height);
    this.sprite.scale.set(this.slot!.flip?-s:s,s);
    this.pose=pose;
  }
  choose(now:number){
    const slot=this.slot!;
    if(this.leader)return;
    // Counter: brew first, then drink (with a "ding" when the coffee is ready), then keep drinking.
    if(slot.seq){
      const next=Math.min(this.actIndex+1,slot.acts.length-1);
      if(this.act?.fx==='brew'&&next!==this.actIndex){
        this.pop('coffee',18,-4,-this.head*0.75,-0.035);
        this.pop(label('ding!','#ffd84d',12),0,10,-this.head-4,-0.02);
      }
      this.actIndex=next;this.start1(slot.acts[next],now);return;
    }
    const mate=this.world.mate(this);
    if(mate&&slot.together&&!mate.leader&&!mate.together&&!this.together&&Math.random()<INTERACT_CHANCE){
      const kinds=slot.together.filter(k=>k!=='poke'||mate.pose==='sit_doze');
      if(kinds.length&&this.interact(any(kinds),mate,now))return;
    }
    const options=slot.acts.map((a,i)=>[i,a.w] as [number,number]).filter(([i])=>slot.acts.length===1||i!==this.actIndex);
    this.actIndex=pick(options);
    this.start1(slot.acts[this.actIndex],now);
  }
  start1(a:Act,now:number){this.act=a;this.show(a.pose);this.until=now+rand(a.min,a.max)*1000;this.particleClock=0}
  // Lead an interaction with the friend in the same group; both hold their poses until it ends.
  interact(kind:Interaction,mate:IdleAgent,now:number){
    const slot=this.slot!,other=mate.slot!;
    if(!slot.talk||!other.talk)return false;
    const [min,max]=INTERACT_SECONDS[kind];
    const end=now+rand(min,max)*1000;
    const poses:Record<Interaction,[string,string]>={
      chat:[slot.talk,other.talk],
      cheers:[slot.acts[0].pose,other.acts[0].pose],
      laugh:['sit_laugh','sit_laugh'],
      selfie:['sit_phone','sit_laugh'],
      poke:['sit_laugh','sit_doze'],
    };
    const [mine,theirs]=poses[kind];
    this.act=null;this.show(mine);this.until=end;
    mate.act=null;mate.show(theirs);mate.until=end;mate.leader=this;
    this.together={kind,partner:mate,start:now,stage:0};
    return true;
  }
  endTogether(){
    const t=this.together;
    if(t){t.partner.leader=null;t.partner.until=0;this.together=null}
    if(this.leader){this.leader.together=null;this.leader=null}
  }
  // Move to a random slot of a random zone; used by the timer and the test button.
  advance(now:number){if(this.active&&!this.fadingOut){this.endTogether();this.fadingOut=true;this.fade=1;this.leaveAt=now+1e9}}
  relocate(now:number){this.advance(now)}
  update(now:number,dt:number){
    if(!this.active)return;
    if(this.fadingOut){
      this.fade=Math.max(0,this.fade-dt/FADE_MS);
      if(this.fade===0){
        this.fadingOut=false;
        const slot=this.world.claim(this);
        if(slot){this.fx.removeChildren();this.place(slot,now)}
        else this.leaveAt=now+5000;
      }
    }else this.fade=Math.min(1,this.fade+dt/FADE_MS);
    this.root.alpha=this.fade;
    if(now>=this.leaveAt)this.advance(now);
    if(!this.fadingOut&&now>=this.until){
      if(this.together)this.endTogether();
      if(!this.leader)this.choose(now);
    }
    this.animate(now);
    this.updateTogether(now);
    this.updateFx(now,dt);
  }
  // Small life in the still sprite: slow breathing while resting, a bounce while laughing.
  animate(now:number){
    const s=this.cast.manifest.scale;
    const breath=BREATH_POSES.has(this.pose)?Math.sin(now/(this.pose==='sit_doze'?900:650))*0.012:0;
    this.sprite.scale.y=s*(1+breath);
    this.sprite.y=this.pose==='sit_laugh'?-Math.round(Math.abs(Math.sin(now/110))*1.5):0;
  }
  spawn(node:Container,vx:number,vy:number,life:number){
    Object.assign(node,{age:0,vx,vy,life});this.fx.addChild(node);
  }
  // A one-off icon (by name) or ready-made node floating up from (x, y).
  pop(what:string|Container,size:number,x:number,y:number,vy=-0.03,life=1100){
    const n=typeof what==='string'?iconSprite(what,size):what;
    n.position.set(x,y);this.spawn(n,rand(-0.006,0.006),vy,life);
  }
  updateTogether(now:number){
    const t=this.together;if(!t)return;
    const m=t.partner,dx=m.root.x-this.root.x,dy=m.root.y-this.root.y,h=this.head;
    const at=(ms:number)=>t.stage<ms&&now-t.start>=ms;
    const mid={x:dx/2,y:dy/2-h*0.6};
    if(t.kind==='cheers'&&at(900)){
      t.stage=900;
      this.pop('sparkle',20,mid.x,mid.y,-0.01,700);
      this.pop(label('Cheers!','#ffd84d',13),0,mid.x,mid.y-14,-0.025,1400);
      this.pop('coffee',14,mid.x-10,mid.y+4,-0.03);this.pop('coffee',14,mid.x+10,mid.y+4,-0.03);
    }else if(t.kind==='cheers'&&at(1500)){
      t.stage=1500;this.pop('heart',14,0,-h-4);m.pop('heart',14,0,-m.head-4);
    }else if(t.kind==='laugh'&&now-t.start>t.stage){
      t.stage+=520;
      this.pop('laugh',13,this.flip*rand(8,18),-h*0.9,-0.035,900);
      m.pop('laugh',13,m.flip*rand(8,18),-m.head*0.9,-0.035,900);
    }else if(t.kind==='selfie'&&at(1300)){
      t.stage=1300;
      const w=Math.abs(dx)+70,top=Math.min(0,dy)-Math.max(h,m.head)-14,hh=Math.abs(dy)+Math.max(h,m.head)+24;
      const flash=new Graphics().roundRect(Math.min(0,dx)-35,top,w,hh,10).fill({color:'#ffffff',alpha:0.7});
      this.spawn(flash,0,0,320);
      this.pop(label('click!','#ffffff',11),0,this.flip*12,-h-6,-0.02,900);
    }else if(t.kind==='selfie'&&at(1700)){
      t.stage=1700;
      for(let i=0;i<3;i++)this.pop(any(['heart','sparkle','star']),12,mid.x+rand(-24,24),mid.y+rand(-10,10),-0.03,1200);
    }else if(t.kind==='poke'&&at(700)){
      t.stage=700;
      this.pop(label('psst~','#fff3b0',11),0,this.flip*14,-h-4,-0.02,900);
    }else if(t.kind==='poke'&&at(1400)){
      // The sleeper wakes up with a start.
      t.stage=1400;
      m.show('sit_relax');m.fx.removeChildren();
      m.pop('exclaim',18,m.flip*10,-m.head-6,-0.04,900);
      m.pop('drop',10,-m.flip*12,-m.head*0.8,-0.02,800);
    }
  }
  updateFx(now:number,dt:number){
    const h=this.head,flip=this.flip;
    this.particleClock+=dt;
    const fx=this.together||this.leader?null:this.act?.fx;
    const every=(ms:number)=>{if(this.particleClock<ms)return false;this.particleClock=0;return true};
    if((fx==='steam'||fx==='sigh')&&every(380)){
      const g=new Graphics().circle(0,0,rand(1.5,2.6)).fill({color:'#ffffff',alpha:0.75});
      g.position.set(flip*rand(6,14),-h*0.55);this.spawn(g,rand(-0.004,0.004),-0.025,1100);
      if(fx==='sigh'&&Math.random()<0.12)this.pop(label('ahh~','#f3e3c8',11),0,flip*20,-h-2,-0.015,1500);
    }else if(fx==='brew'&&every(240)){
      const g=new Graphics().circle(0,0,rand(1.5,3)).fill({color:'#ffffff',alpha:0.6});
      g.position.set(rand(-10,6),-h*0.55);this.spawn(g,rand(-0.004,0.004),-0.03,900);
      if(Math.random()<0.25){
        const d=new Graphics().rect(-1,0,2,3).fill('#7a4a2a');
        d.position.set(rand(-6,2),-h*0.45);this.spawn(d,0,0.02,500);
      }
    }else if(fx==='music'&&every(1300)){
      const n=iconSprite('music',rand(11,15));n.position.set(flip*rand(8,16),-h*0.85);
      this.spawn(n,flip*rand(0.006,0.014),-0.025,1600);
    }else if(fx==='game'&&every(1600)){
      if(Math.random()<0.18){
        this.pop(label('WIN!','#ffd84d',12),0,flip*14,-h-6,-0.025,1300);
        for(let i=0;i<3;i++)this.pop(any(['star','sparkle']),11,flip*rand(4,24),-h*rand(0.6,0.9),-0.03,1000);
      }else if(Math.random()<0.6)this.pop('star',12,flip*10,-h*0.7,-0.03,900);
    }else if(fx==='scroll'&&every(1700)){
      this.pop(Math.random()<0.7?'heart':'heart_v',12,flip*rand(6,14),-h*0.72,-0.03,1100);
    }else if(fx==='zzz'&&every(900)){
      const z=label('z','#8ec5ff',rand(10,14));
      z.position.set(flip*14,-h*0.85);this.spawn(z,flip*0.01,-0.02,1700);
    }else if(fx==='view'&&every(1500)){
      // Twinkles out of the city window the agent is looking at.
      const s=iconSprite('sparkle',rand(8,12));s.position.set(rand(-40,0),-h-rand(0,26));this.spawn(s,0,-0.004,1400);
      if(Math.random()<0.2)this.pop(label('~','#fff3b0',13),0,-12,-h-4,-0.015,1400);
    }else if(fx==='water'&&every(450)){
      const g=new Graphics().circle(0,0,rand(1.2,2.2)).fill({color:'#6fc3ff',alpha:0.85});
      g.position.set(flip*rand(4,10),-h*0.55);this.spawn(g,rand(-0.003,0.003),-0.02,800);
      if(Math.random()<0.08)this.pop('drop',11,flip*16,-h*0.8,-0.02,1000);
    }
    for(const c of [...this.fx.children] as (Container&{life:number;age:number;vx:number;vy:number})[]){
      c.age+=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.alpha=Math.max(0,1-c.age/c.life);
      if(c.age>=c.life)c.destroy();
    }
    // Speech bubbles only while chatting; the other interactions show their own effects.
    const talking=(this.together??this.leader?.together)?.kind==='chat'&&TALK_POSES.has(this.pose);
    this.bubble.visible=talking;
    if(talking){
      this.bubble.position.set(flip*24,-h-8+Math.round(Math.sin(now/180)));
      if(Math.floor(now/1100)!==Math.floor((now-dt)/1100))setIcon(this.icon,this.pose==='sit_laugh'?'laugh':any(CHAT_ICONS),16);
    }
  }
}
