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
  it('numbered agents are fixed: builder-N and reviewer-N always get the same character',()=>{
    const mapper=new LiveMapper();
    mapper.map(file(['builder-1','builder'],['builder-2','builder']));
    const m=mapper.map(file(['builder-4','builder'],['builder-6','builder-strong'],['reviewer-3','reviewer','review']));
    expect(who(m)).toEqual({vega:['builder-4'],comet:['builder-6'],juno:['reviewer-3']});
  });
  it('reviewer-5/6 wrap to Sage/Iris and share the sprite',()=>{
    const m=new LiveMapper().map(file(['reviewer-1','reviewer','review'],['reviewer-5','reviewer','review'],['reviewer-6','reviewer','review']));
    expect(who(m)).toEqual({sage:['reviewer-1','reviewer-5'],iris:['reviewer-6']});
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

describe('LiveMapper memory (ids without a number)',()=>{
  it('an agent coming back soon gets its old character again',()=>{
    const mapper=new LiveMapper();
    mapper.map(file(['builder-a','builder'],['builder-b','builder']),0);
    mapper.map(file(['reviewer-x','reviewer','review']),1000);           // both builders left
    const m=mapper.map(file(['builder-b','builder'],['builder-c','builder']),2000);
    expect(who(m)).toEqual({orion:['builder-b'],nova:['builder-c']});
  });
});
