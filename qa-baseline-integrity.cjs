const fs=require('fs');
const crypto=require('crypto');
const manifest=JSON.parse(fs.readFileSync('docs/baseline-14.22-manifest.json','utf8'));
let failures=0;
for(const item of manifest.files){
  if(!fs.existsSync(item.path)){console.error('MISSING',item.path);failures++;continue;}
  const data=fs.readFileSync(item.path);
  const hash=crypto.createHash('sha256').update(data).digest('hex');
  if(data.length!==item.size){console.error('SIZE',item.path,data.length,'!=',item.size);failures++;}
  if(hash!==item.sha256){console.error('SHA256',item.path,hash,'!=',item.sha256);failures++;}
}
if(failures){console.error('Baseline integrity failures:',failures);process.exit(1);}
console.log('Baseline 14.22 integrity OK:',manifest.files.length,'files');
