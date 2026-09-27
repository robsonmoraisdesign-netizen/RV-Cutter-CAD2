import assert from 'node:assert/strict';
import {resolveProjectTransition} from './src/project-transition.mjs';

async function run(choice,{saveResult=true}={}){
  const log=[];
  const ok=await resolveProjectTransition({
    active:true,
    prompt:async()=>{log.push('prompt');return choice;},
    save:async()=>{log.push('save');return saveResult;},
    discard:async()=>{log.push('discard');},
    close:async()=>{log.push('close');}
  });
  return {ok,log};
}
assert.deepEqual(await run('save'),{ok:true,log:['prompt','save','close']});
assert.deepEqual(await run('discard'),{ok:true,log:['prompt','discard','close']});
assert.deepEqual(await run('cancel'),{ok:false,log:['prompt']});
assert.deepEqual(await run('save',{saveResult:false}),{ok:false,log:['prompt','save']});
let touched=false;
assert.equal(await resolveProjectTransition({active:false,prompt:async()=>{touched=true;},save:async()=>true,close:async()=>{}}),true);
assert.equal(touched,false);
console.log('Project transition guard: PASS');
