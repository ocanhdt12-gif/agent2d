// Idle agents: an agent with no work takes a break in the Cafe and the Lounge on a fixed routine
// (coffee counter → cafe table → lounge → back for a refill), never a random jump. Each slot has its own
// fixed poses that fit that exact chair/sofa. No walking: the agent fades out and in at the next slot.
// Each slot holds one agent; slots closer than BLOCK_RADIUS or listed in `conflicts` (including work seats
// registered as blockers, e.g. 'P' = Pixel's sofa desk) block each other, so sprites never overlap.
import {Container,Graphics,Sprite,Text,type Texture} from 'pixi.js';
import {iconSprite,setIcon} from './pixel-icons';

export type IdleManifest={scale:number;poses:Record<string,{file:string;width:number;height:number;anchorX:number;anchorY:number}>};
export type IdleCast={name:string;manifest:IdleManifest;textures:Record<string,Texture>};

type Zone='counter'|'cafe'|'lounge';
// [pose, weight, min s, max s]
type Act=[string,number,number,number];
export type IdleSlot={id:string;x:number;y:number;zone:Zone;flip:boolean;acts:Act[];
  // pose used to chat when a friend sits in the same `group`
  talk?:string;group?:string;conflicts?:string[]};

// Floor contact of each slot on office_original.png (1496x1051), tuned one by one on zoomed renders (22/10):
// cafe chair sprites cover the painted chairs; lounge sprites sit inside the cushions, not on the front edge.
export const IDLE_SLOTS:IdleSlot[]=[
  // coffee counter: brew, then drink, always in this order
  {id:'C5',x:240,y:302,zone:'counter',flip:false,acts:[['stand_brew',1,4,6],['stand_drink',1,3,5]]},
  // cafe table A (C1 back to the viewer, C2 facing out) and table B (C3/C4 overlap: one at a time)
  {id:'C2',x:231,y:430,zone:'cafe',flip:true,group:'tableA',talk:'chair_front_talk',acts:[['chair_front_drink',1,6,12]]},
  {id:'C1',x:188,y:425,zone:'cafe',flip:false,group:'tableA',talk:'chair_back_talk',acts:[['chair_back_drink',1,6,12]]},
  {id:'C4',x:410,y:338,zone:'cafe',flip:true,group:'tableB',talk:'chair_front_talk',acts:[['chair_front_drink',1,6,12]],conflicts:['C3']},
  {id:'C3',x:348,y:352,zone:'cafe',flip:false,group:'tableB',talk:'chair_back_talk',acts:[['chair_back_drink',1,6,12]],conflicts:['C4']},
  // lounge: L-sofa, two poufs, loveseat, water cooler
  {id:'R2',x:1268,y:782,zone:'lounge',flip:false,group:'sofa',talk:'sit_laugh',acts:[['sit_drink',40,5,9],['sit_relax',35,6,10],['sit_phone',25,6,10]]},
  {id:'R1',x:1162,y:795,zone:'lounge',flip:false,group:'sofa',talk:'sit_laugh',acts:[['sit_relax',40,6,10],['sit_phone',35,6,10],['sit_drink',25,5,9]],conflicts:['P']},
  {id:'R3',x:1335,y:803,zone:'lounge',flip:true,group:'sofa',talk:'sit_laugh',acts:[['sit_phone',50,6,10],['sit_relax',50,6,10]]},
  {id:'R6',x:1152,y:888,zone:'lounge',flip:false,group:'poufs',talk:'sit_laugh',acts:[['sit_doze',60,10,16],['sit_relax',40,6,10]]},
  {id:'R5',x:1080,y:858,zone:'lounge',flip:false,group:'poufs',talk:'sit_laugh',acts:[['sit_relax',50,6,10],['sit_phone',50,6,10]]},
  {id:'R7',x:1336,y:928,zone:'lounge',flip:false,acts:[['sit_back',1,8,14]]},
  {id:'R8',x:1420,y:918,zone:'lounge',flip:true,acts:[['stand_drink',1,5,9]]},
];
const BLOCK_RADIUS=40;
// The break routine: [zone, seconds spent there]. A full zone is skipped.
const ROUTINE:[Zone,number,number][]=[['counter',7,11],['cafe',25,40],['lounge',40,70]];
const CHAT_CHANCE=0.35;

const TALK_POSES=new Set(['chair_front_talk','chair_back_talk','sit_laugh']);
const DRINK_POSES=new Set(['sit_drink','chair_front_drink','chair_back_drink','stand_drink']);
const CHAT_ICONS=['chat','laugh','heart','coffee','star','sparkle','note'];
const FADE_MS=300;
const rand=(a:number,b:number)=>a+Math.random()*(b-a);
const pick=<T>(items:[T,number][])=>{let r=Math.random()*items.reduce((s,[,w])=>s+w,0);for(const [it,w] of items)if((r-=w)<0)return it;return items[0][0]};

export class IdleWorld{
  owner=new Map<string,IdleAgent>();
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
  // First free slot of a zone, in the fixed order of IDLE_SLOTS.
  claim(agent:IdleAgent,zone:Zone){
    const slot=IDLE_SLOTS.find(s=>s.zone===zone&&s.id!==agent.slot?.id&&this.free(s,agent));
    if(!slot)return null;
    this.release(agent);
    this.owner.set(slot.id,agent);
    return slot;
  }
  release(agent:IdleAgent){if(agent.slot&&this.owner.get(agent.slot.id)===agent)this.owner.delete(agent.slot.id)}
  // A friend in the same table/sofa group.
  mate(agent:IdleAgent){
    const g=agent.slot?.group;if(!g)return null;
    return this.agents.find(a=>a!==agent&&a.active&&!a.fadingOut&&a.slot?.group===g)??null;
  }
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
  step=0;
  actIndex=0;
  until=0;
  leaveAt=0;
  fade=1;
  fadingOut=false;
  particleClock=0;
  constructor(public world:IdleWorld,public cast:IdleCast){
    this.bubble.addChild(new Graphics().roundRect(-13,-12,26,22,7).fill('#ffffff').stroke({color:'#16223a',width:2}).poly([-4,10,4,10,-2,16]).fill('#ffffff'),this.icon);
    this.bubble.visible=false;
    this.root.addChild(this.sprite,this.fx,this.bubble);
    this.root.visible=false;
    world.layer.addChild(this.root);world.agents.push(this);
  }
  get head(){return this.sprite.height}
  // Start the break at the coffee counter (or the first routine zone with room).
  start(now:number){
    for(let i=0;i<ROUTINE.length;i++){
      const slot=this.world.claim(this,ROUTINE[i][0]);
      if(slot){this.step=i;this.active=true;this.place(slot,now);this.root.visible=true;this.fade=0;this.fadingOut=false;return true}
    }
    return false;
  }
  stop(){this.active=false;this.world.release(this);this.slot=null;this.root.visible=false;this.fx.removeChildren();this.bubble.visible=false}
  place(slot:IdleSlot,now:number){
    this.slot=slot;
    this.root.position.set(slot.x,slot.y);this.root.zIndex=slot.y;
    const [,min,max]=ROUTINE[this.step];
    this.leaveAt=now+rand(min,max)*1000;
    this.actIndex=-1;
    this.choose(now);
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
    // Counter: brew first, then drink, then stay drinking.
    if(slot.zone==='counter'){
      this.actIndex=Math.min(this.actIndex+1,slot.acts.length-1);
      const [pose,,min,max]=slot.acts[this.actIndex];
      this.show(pose);this.until=now+rand(min,max)*1000;return;
    }
    const mate=this.world.mate(this);
    if(slot.talk&&mate&&!TALK_POSES.has(this.pose)&&Math.random()<CHAT_CHANCE){
      this.show(slot.talk);this.until=now+rand(3,6)*1000;mate.chatBack(now);return;
    }
    const options=slot.acts.filter(a=>slot.acts.length===1||a[0]!==this.pose);
    const pose=pick(options.map(a=>[a[0],a[1]] as [string,number]));
    const act=slot.acts.find(a=>a[0]===pose)!;
    this.show(act[0]);this.until=now+rand(act[2],act[3])*1000;
  }
  chatBack(now:number){
    if(this.slot?.talk&&!this.fadingOut){this.show(this.slot.talk);this.until=now+rand(3,6)*1000}
  }
  // Go to the next stop of the routine (skips zones that are full); used by the timer and the test button.
  advance(now:number){if(this.active&&!this.fadingOut){this.fadingOut=true;this.fade=1;this.leaveAt=now+1e9}}
  relocate(now:number){this.advance(now)}
  update(now:number,dt:number){
    if(!this.active)return;
    if(this.fadingOut){
      this.fade=Math.max(0,this.fade-dt/FADE_MS);
      if(this.fade===0){
        this.fadingOut=false;
        for(let i=1;i<=ROUTINE.length;i++){
          const step=(this.step+i)%ROUTINE.length,slot=this.world.claim(this,ROUTINE[step][0]);
          if(slot){this.step=step;this.fx.removeChildren();this.place(slot,now);break}
        }
        if(!this.slot)this.leaveAt=now+5000;
      }
    }else this.fade=Math.min(1,this.fade+dt/FADE_MS);
    this.root.alpha=this.fade;
    if(now>=this.leaveAt)this.advance(now);
    if(!this.fadingOut&&now>=this.until)this.choose(now);
    this.updateFx(now,dt);
  }
  spawn(node:Container,vx:number,vy:number,life:number){
    Object.assign(node,{age:0,vx,vy,life});this.fx.addChild(node);
  }
  updateFx(now:number,dt:number){
    const h=this.head,flip=this.slot!.flip?-1:1;
    this.particleClock+=dt;
    if(DRINK_POSES.has(this.pose)&&this.particleClock>380){
      this.particleClock=0;
      const g=new Graphics().circle(0,0,rand(1.5,2.6)).fill({color:'#ffffff',alpha:0.75});
      g.position.set(flip*rand(6,14),-h*0.55);this.spawn(g,rand(-0.004,0.004),-0.025,1100);
    }else if(this.pose==='sit_doze'&&this.particleClock>900){
      this.particleClock=0;
      const z=new Text({resolution:3,text:'z',style:{fontFamily:'"Nunito","Trebuchet MS",sans-serif',fontSize:rand(10,14),fontWeight:'900',fill:'#8ec5ff',stroke:{color:'#16223a',width:3}}});
      z.anchor.set(.5);z.position.set(flip*14,-h*0.85);this.spawn(z,flip*0.01,-0.02,1700);
    }else if(this.pose==='stand_brew'&&this.particleClock>260){
      this.particleClock=0;
      const g=new Graphics().circle(0,0,rand(1.5,3)).fill({color:'#ffffff',alpha:0.6});
      g.position.set(rand(-10,6),-h*0.55);this.spawn(g,rand(-0.004,0.004),-0.03,900);
    }else if(this.pose==='sit_phone'&&this.particleClock>2400&&Math.random()<0.5){
      this.particleClock=0;
      const s=iconSprite('star',14);s.position.set(flip*10,-h*0.7);this.spawn(s,flip*0.01,-0.03,900);
    }
    for(const c of [...this.fx.children] as (Container&{life:number;age:number;vx:number;vy:number})[]){
      c.age+=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.alpha=Math.max(0,1-c.age/c.life);
      if(c.age>=c.life)c.destroy();
    }
    const talking=TALK_POSES.has(this.pose);
    this.bubble.visible=talking;
    if(talking){
      this.bubble.position.set(flip*24,-h-8+Math.round(Math.sin(now/180)));
      if(Math.floor(now/1100)!==Math.floor((now-dt)/1100))setIcon(this.icon,this.pose==='sit_laugh'?'laugh':CHAT_ICONS[Math.floor(Math.random()*CHAT_ICONS.length)],16);
    }
  }
}
