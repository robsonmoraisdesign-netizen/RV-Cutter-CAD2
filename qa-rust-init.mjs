import fs from 'node:fs';
import {initSketchKernel} from './src/sketch/rust-kernel.mjs';
await initSketchKernel(fs.readFileSync(new URL('./generated/rv-sketch/rv_sketch_core_bg.wasm',import.meta.url)));
