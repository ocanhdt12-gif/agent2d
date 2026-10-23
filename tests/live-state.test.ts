import {describe,it,expect} from 'vitest';
import {LiveMapper} from '../src/live-state';

const file=(...agents:[string,string,string?][])=>({agents:agents.map(([agent,role,phase])=>({agent,role,phase:phase??'building'}))});
const who=(m:Map<string,{agents:{agent:string}[]}>)=>Object.fromEntries([...m].map(([c,v])=>[c,v.agents.map(a=>a.agent)]));

describe('LiveMapper',()=>{
  it('maps agent-live roles to characters',()=>{
    const m=new LiveMapper().map(file(['builder-1','builder'],['builder-2','builder'],['reviewer-1','reviewer','review'],
      ['merger','merger','merging'],['dispatcher','dispatcher','orchestrating'],['spec-validator','spec-validator'],
      ['design','design'],['error-analyzer','error-analyzer'],['graph','graph']));
    expect(who(m)).toEqual({nova:['builder-1'],orion:['builder-2'],sage:['reviewer-1'],eve:['merger'],
      theo:['dispatcher','graph'],oracle:['spec-validator'],pixel:['design'],sherlock:['error-analyzer']});
  });
  it('idle phase and unknown agents: idle is not work, unknown role goes to Theo',()=>{
    const m=new LiveMapper().map(file(['builder-1','builder','idle'],['qa-bot','tester']));
    expect(who(m)).toEqual({theo:['qa-bot']});
  });
  it('keeps a builder on the same character while it lives',()=>{
    const mapper=new LiveMapper();
    mapper.map(file(['builder-1','builder'],['builder-2','builder']));
    const m=mapper.map(file(['builder-2','builder'],['builder-3','builder']));
    expect(who(m)).toEqual({orion:['builder-2'],nova:['builder-3']});
  });
  it('old engine names map straight, merged roles show one character',()=>{
    const m=new LiveMapper().map(file(['Captain','dispatcher'],['Muse','brainstorm'],['Scout','spec-init'],['Lyra','builder']));
    expect(who(m)).toEqual({theo:['Captain','Muse'],oracle:['Scout'],lyra:['Lyra']});
  });
  it('more builders than characters never adds an extra sprite',()=>{
    const m=new LiveMapper().map(file(...Array.from({length:8},(_,i)=>[`builder-${i+1}`,'builder'] as [string,string])));
    expect([...m.keys()].sort()).toEqual(['atlas','comet','lyra','nova','orion','vega']);
  });
});
