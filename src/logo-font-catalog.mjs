export const LOGO_FONT_CATALOG=Object.freeze([
 {id:'helvetiker',label:'Sans Clean',group:'RV',family:'Arial, Helvetica, sans-serif',weight:600,stretch:1},
 {id:'helvetiker-bold',label:'Sans Bold',group:'RV',family:'Arial Black, Arial, Helvetica, sans-serif',weight:900,stretch:1.02},
 {id:'optimer',label:'Humanista',group:'RV',family:'Trebuchet MS, Arial, sans-serif',weight:600,stretch:.98},
 {id:'gentilis',label:'Serif',group:'RV',family:'Georgia, Times New Roman, serif',weight:700,stretch:1},
 {id:'allerta-stencil',label:'Allerta Stencil',group:'Onshape',family:'"Allerta Stencil", Impact, Arial Black, sans-serif',weight:400,stretch:1},
 {id:'arimo',label:'Arimo',group:'Onshape',family:'Arimo, Arial, Helvetica, sans-serif',weight:500,stretch:1},
 {id:'balthazar',label:'Balthazar',group:'Onshape',family:'Balthazar, Georgia, Times New Roman, serif',weight:500,stretch:.98},
 {id:'baumans',label:'Baumans',group:'Onshape',family:'Baumans, "Bauhaus 93", "Century Gothic", sans-serif',weight:500,stretch:1},
 {id:'bebas-neue',label:'Bebas Neue',group:'Onshape',family:'"Bebas Neue", "Arial Narrow", Impact, sans-serif',weight:500,stretch:.82},
 {id:'comic-neue',label:'Comic Neue',group:'Onshape',family:'"Comic Neue", "Comic Sans MS", cursive',weight:500,stretch:1},
 {id:'courier-prime',label:'Courier Prime',group:'Onshape',family:'"Courier Prime", "Courier New", monospace',weight:500,stretch:1},
 {id:'didact-gothic',label:'Didact Gothic',group:'Onshape',family:'"Didact Gothic", "Century Gothic", "Segoe UI", sans-serif',weight:500,stretch:1},
 {id:'droid-sans-mono',label:'Droid Sans Mono',group:'Onshape',family:'"Droid Sans Mono", Consolas, "Courier New", monospace',weight:500,stretch:1},
 {id:'inconsolata',label:'Inconsolata',group:'Onshape',family:'Inconsolata, Consolas, "Courier New", monospace',weight:500,stretch:.94},
 {id:'inter',label:'Inter',group:'Onshape',family:'Inter, "Segoe UI", Arial, sans-serif',weight:550,stretch:1},
 {id:'michroma',label:'Michroma',group:'Onshape',family:'Michroma, Eurostile, "Bank Gothic", Arial, sans-serif',weight:500,stretch:1.06},
 {id:'mplus-rounded-1c',label:'M PLUS Rounded 1c',group:'Onshape',family:'"M PLUS Rounded 1c", "Arial Rounded MT Bold", "Segoe UI", sans-serif',weight:500,stretch:1},
 {id:'noto-sans',label:'Noto Sans',group:'Noto',family:'"Noto Sans", "Segoe UI", Arial, sans-serif',weight:500,stretch:1},
 {id:'noto-sans-sc',label:'Noto Sans Chinese Simplified',group:'Noto',family:'"Noto Sans SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif',weight:500,stretch:1},
 {id:'noto-sans-tc',label:'Noto Sans Chinese Traditional',group:'Noto',family:'"Noto Sans TC", "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif',weight:500,stretch:1},
 {id:'noto-sans-jp',label:'Noto Sans Japanese',group:'Noto',family:'"Noto Sans JP", "Yu Gothic UI", Meiryo, sans-serif',weight:500,stretch:1},
 {id:'noto-sans-kr',label:'Noto Sans Korean',group:'Noto',family:'"Noto Sans KR", "Malgun Gothic", sans-serif',weight:500,stretch:1},
 {id:'noto-serif',label:'Noto Serif',group:'Noto',family:'"Noto Serif", Georgia, "Times New Roman", serif',weight:600,stretch:1}
]);

export const LOGO_FONT_IDS=Object.freeze(LOGO_FONT_CATALOG.map(x=>x.id));
export function logoFontStyle(id){return LOGO_FONT_CATALOG.find(x=>x.id===id)||LOGO_FONT_CATALOG[0];}
