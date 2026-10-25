import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
const cargo=process.env.CARGO||'cargo',bindgen=process.env.WASM_BINDGEN||'wasm-bindgen';
execFileSync(cargo,['build','--manifest-path','rust/sketch-core/Cargo.toml','--locked','--release','--target','wasm32-unknown-unknown'],{stdio:'inherit'});
fs.mkdirSync('generated/rv-sketch',{recursive:true});
execFileSync(bindgen,['rust/sketch-core/target/wasm32-unknown-unknown/release/rv_sketch_core.wasm','--target','web','--out-dir','generated/rv-sketch'],{stdio:'inherit'});

fs.writeFileSync('generated/rv-sketch/package.json',JSON.stringify({type:'module'}));
