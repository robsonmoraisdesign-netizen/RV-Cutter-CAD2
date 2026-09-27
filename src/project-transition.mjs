export async function resolveProjectTransition({active,prompt,save,discard,close}){
  if(!active)return true;
  const choice=await prompt();
  if(choice==='cancel'||choice==null)return false;
  if(choice==='save'){
    const ok=await save();
    if(!ok)return false;
  }else if(choice==='discard'){
    if(discard)await discard();
  }else throw Error('Decisão de saída inválida.');
  await close();
  return true;
}
