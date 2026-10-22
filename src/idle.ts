// Idle agents: when an agent has no work it sits on a background chair/sofa in the Cafe or the Lounge.
// No walking: an agent fades out and fades in at another free slot. Each slot holds one agent, and a slot
// is also blocked while any occupied slot (idle or a work seat) is within BLOCK_RADIUS or listed in
// `conflicts` — so sprites never sit on top of each other.
import {Container,Graphics,Sprite,Text,type Texture} from 'pixi.js';
import {iconSprite,setIcon} from './pixel-icons';

export type IdleManifest={scale:number;poses:Record<string,{file:string;width:number;height:number;anchorX:number;anchorY:number}>};
export type IdleCast={name:string;manifest:IdleManifest;textures:Record<string,Texture>};

type SlotKind='sofa'|'loveseat'|'chair_front'|'chair_back'|'counter'|'cooler';
export type IdleSlot={id:string;x:number;y:number;kind:SlotKind;flip:boolean;conflicts?:string[]};

// Floor contact of each slot on office_original.png (1496x1051). chair_* sprites include the cafe chair and
// are placed so it covers the chair painted in the background (tuned 22/10, see idle-slots-*.png).
export const IDLE_SLOTS:IdleSlot[]=[
  {id:'C1',x:188,y:425,kind:'chair_back',flip:false},
  {id:'C2',x:231,y:430,kind:'chair_front',flip:true},
  {id:'C3',x:348,y:352,kind:'chair_back',flip:false,conflicts:['C4']},
  {id:'C4',x:410,y:338,kind:'chair_front',flip:true,conflicts:['C3']},
  {id:'C5',x:240,y:302,kind:'counter',flip:false},
  {id:'R1',x:1150,y:815,kind:'sofa',flip:false,conflicts:['P']},
  {id:'R2',x:1265,y:800,kind:'sofa',flip:false},
  {id:'R3',x:1345,y:825,kind:'sofa',flip:true},
  {id:'R5',x:1078,y:875,kind:'sofa',flip:false},
  {id:'R6',x:1150,y:905,kind:'sofa',flip:false},
  {id:'R7',x:1330,y:940,kind:'loveseat',flip:false},
  {id:'R8',x:1432,y:908,kind:'cooler',flip:true},
];
// Slots closer than this always block each other; pairs that only overlap at certain angles are listed
// explicitly in `conflicts` (a work seat counts by its blocker id, e.g. 'P' = Pixel's sofa desk).
const BLOCK_RADIUS=40;

// Activities per slot kind: [pose, weight, min s, max s]. Talk poses are also picked to chat with a neighbour.
type Act=[string,number,number,number];
const ACTS:Record<SlotKind,Act[]>={
  sofa:[['sit_relax',30,5,10],['sit_drink',22,4,8],['sit_phone',22,5,10],['sit_laugh',10,2,4],['sit_doze',16,8,14]],
  loveseat:[['sit_back',1,6,12]],
  chair_front:[['chair_front_drink',60,5,10],['chair_front_talk',40,3,6]],
  chair_back:[['chair_back_drink',60,5,10],['chair_back_talk',40,3,6]],
  counter:[['stand_brew',55,4,7],['stand_drink',45,4,8]],
  cooler:[['stand_drink',1,5,9]],
};
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
  occupiedPoints(except?:IdleAgent){
    const pts:{x:number;y:number;id?:string}[]=[];
    for(const [id,a] of this.owner)if(a!==except){const s=IDLE_SLOTS.find(s=>s.id===id)!;pts.push({x:s.x,y:s.y,id})}
    for(const b of this.blockers)if(b.active())pts.push(b);
    return pts;
  }
  free(slot:IdleSlot,except?:IdleAgent){
    if(this.owner.has(slot.id)&&this.owner.get(slot.id)!==except)return false;
    return this.occupiedPoints(except).every(p=>p.id!==slot.id&&!slot.conflicts?.includes(p.id??'')&&Math.hypot(p.x-slot.x,p.y-slot.y)>BLOCK_RADIUS);
  }
  claim(agent:IdleAgent,prefer?:string){
    const options=IDLE_SLOTS.filter(s=>s.id!==agent.slot?.id&&this.free(s,agent));
    if(!options.length)return null;
    const slot=options.find(s=>s.id===prefer)??options[Math.floor(Math.random()*options.length)];
    if(agent.slot)this.owner.delete(agent.slot.id);
    this.owner.set(slot.id,agent);
    return slot;
  }
  release(agent:IdleAgent){if(agent.slot&&this.owner.get(agent.slot.id)===agent)this.owner.delete(agent.slot.id)}
  neighbour(agent:IdleAgent){
    if(!agent.slot)return null;
    let best:IdleAgent|null=null,dist=130;
    for(const a of this.agents)if(a!==agent&&a.active&&a.slot){const d=Math.hypot(a.slot.x-agent.slot.x,a.slot.y-agent.slot.y);if(d<dist){dist=d;best=a}}
    return best;
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
  until=0;
  moveAt=0;
  fade=1;
  fadingOut=false;
  nextSlot:string|undefined;
  particleClock=0;
  constructor(public world:IdleWorld,public cast:IdleCast){
    this.bubble.addChild(new Graphics().roundRect(-13,-12,26,22,7).fill('#ffffff').stroke({color:'#16223a',width:2}).poly([-4,10,4,10,-2,16]).fill('#ffffff'),this.icon);
    this.bubble.visible=false;
    this.root.addChild(this.sprite,this.fx,this.bubble);
    this.root.visible=false;
    world.layer.addChild(this.root);world.agents.push(this);
  }
  get head(){return this.sprite.height}
  start(now:number,prefer?:string){
    const slot=this.world.claim(this,prefer);
    if(!slot)return false;
    this.active=true;this.place(slot,now);
    this.root.visible=true;this.fade=0;this.fadingOut=false;
    return true;
  }
  stop(){this.active=false;this.world.release(this);this.slot=null;this.root.visible=false;this.fx.removeChildren();this.bubble.visible=false}
  place(slot:IdleSlot,now:number){
    this.slot=slot;
    this.root.position.set(slot.x,slot.y);this.root.zIndex=slot.y;
    this.moveAt=now+rand(25,50)*1000;
    this.choose(now);
  }
  show(pose:string){
    const p=this.cast.manifest.poses[pose],s=this.cast.manifest.scale;
    this.sprite.texture=this.cast.textures[pose];
    this.sprite.anchor.set(p.anchorX/p.width,p.anchorY/p.height);
    this.sprite.scale.set(this.slot!.flip?-s:s,s);
    this.pose=pose;
  }
  choose(now:number,force?:string){
    const acts=ACTS[this.slot!.kind];
    let act=acts.find(a=>a[0]===force);
    if(!act){
      // chat with a neighbour now and then: both switch to a talk pose
      const mate=this.world.neighbour(this),talk=acts.find(a=>TALK_POSES.has(a[0]));
      if(mate&&talk&&Math.random()<0.4){act=talk;mate.chatWith(now)}
      else{
        const pose=pick(acts.filter(a=>acts.length===1||a[0]!==this.pose).map(a=>[a[0],a[1]] as [string,number]));
        act=acts.find(a=>a[0]===pose)!;
      }
    }
    this.show(act[0]);
    this.until=now+rand(act[2],act[3])*1000;
    this.bubble.visible=false;
  }
  chatWith(now:number){
    const talk=ACTS[this.slot!.kind].find(a=>TALK_POSES.has(a[0]));
    if(talk&&now>this.until-1500){this.show(talk[0]);this.until=now+rand(talk[2],talk[3])*1000}
  }
  relocate(now:number,prefer?:string){if(this.active&&!this.fadingOut){this.fadingOut=true;this.fade=1;this.nextSlot=prefer;this.moveAt=now+1e9}}
  update(now:number,dt:number){
    if(!this.active)return;
    // fade between slots
    if(this.fadingOut){
      this.fade=Math.max(0,this.fade-dt/FADE_MS);
      if(this.fade===0){
        this.fadingOut=false;
        const slot=this.world.claim(this,this.nextSlot);
        if(slot){this.fx.removeChildren();this.place(slot,now)}
      }
    }else this.fade=Math.min(1,this.fade+dt/FADE_MS);
    this.root.alpha=this.fade;
    if(now>=this.moveAt&&Math.random()<0.5)this.relocate(now);else if(now>=this.moveAt)this.moveAt=now+rand(20,40)*1000;
    if(now>=this.until)this.choose(now);
    this.updateFx(now,dt);
  }
  spawn(node:Container,vx:number,vy:number,life:number){
    (node as Container&{life:number;age:number;vx:number;vy:number}).life=life;
    Object.assign(node,{age:0,vx,vy});this.fx.addChild(node);
  }
  updateFx(now:number,dt:number){
    const h=this.head,flip=this.slot!.flip?-1:1;
    this.particleClock+=dt;
    if(DRINK_POSES.has(this.pose)&&this.particleClock>380){
      // steam from the cup
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
    // speech bubble while talking/laughing
    const talking=TALK_POSES.has(this.pose);
    this.bubble.visible=talking;
    if(talking){
      this.bubble.position.set(flip*24,-h-8+Math.round(Math.sin(now/180)));
      if(Math.floor(now/1100)!==Math.floor((now-dt)/1100))setIcon(this.icon,this.pose==='sit_laugh'?'laugh':CHAT_ICONS[Math.floor(Math.random()*CHAT_ICONS.length)],16);
    }
  }
}
