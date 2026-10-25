import {validateSketch} from './model.mjs';
import {sketchCommand} from './rust-kernel.mjs';
export function solveSketch(input,{maxIterations=240,tolerance=1e-6}={}){
 validateSketch(input);
 if(!Number.isInteger(maxIterations)||maxIterations<1||maxIterations>1000||!Number.isFinite(tolerance)||tolerance<=0)throw Error('Opções do solver inválidas.');
 return sketchCommand('solve',input);
}
