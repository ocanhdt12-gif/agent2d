import {defineConfig,type Plugin} from 'vite';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

// Live state: the page polls /state.json, which serves the agents-live JSON written by the other system
// (opencode-project-template's agent-live.mjs). Path from studio.config.json → "stateFile" (relative to this
// project or absolute); the STATE_FILE env var overrides it. Read fresh on every request, never cached.
function liveState():Plugin{
  const config=()=>{
    try{return JSON.parse(readFileSync(resolve(__dirname,'studio.config.json'),'utf8'))}catch{return {}}
  };
  const handler=(req:{url?:string},res:{setHeader:(k:string,v:string)=>void;statusCode:number;end:(b:string)=>void},next:()=>void)=>{
    if(!req.url?.startsWith('/state.json'))return next();
    const cfg=config(),file=resolve(__dirname,process.env.STATE_FILE||cfg.stateFile||'.context/agents-live.json');
    res.setHeader('Content-Type','application/json');
    res.setHeader('Cache-Control','no-store');
    try{res.statusCode=200;res.end(readFileSync(file,'utf8'))}
    catch{res.statusCode=200;res.end(JSON.stringify({missing:true,file,pollMs:cfg.pollMs}))}
  };
  return {
    name:'live-state',
    configureServer(server){server.middlewares.use(handler)},
    configurePreviewServer(server){server.middlewares.use(handler)},
  };
}

export default defineConfig({
  plugins:[liveState()],
  server: {proxy: {'/api': {target: 'http://localhost:7788', changeOrigin: true}}},
  preview: {proxy: {'/api': {target: 'http://localhost:7788', changeOrigin: true}}},
});
