# RV Cutter CAD 14.28.11 — motor universal de aparência, cores e contraste

## Objetivo
A aparência do RV não depende mais apenas de cores locais espalhadas em CSS, Canvas, SVG e Three.js. A versão 14.28.11 introduz um controlador semântico central que define como cada papel visual deve se comportar em tema escuro e claro.

## Fonte única de verdade
O arquivo `src/theme-controller.mjs` concentra:
- superfícies e níveis de profundidade;
- texto primário, secundário, discreto e desabilitado;
- bordas suaves e fortes;
- destaque, foco, hover, seleção e estados ativos;
- sucesso, aviso, erro e informação;
- backdrop, sombra e sobreposição;
- fundo e grade do viewport;
- cotas 3D;
- ferramenta Medir;
- entidades, restrições, seleção e construção do Sketch;
- paleta padrão dos componentes 3D.

O CSS de aplicação consome somente papéis semânticos. O runtime JS usa a mesma fonte para Canvas, SVG e Three.js.

## Contraste
O controlador possui cálculo de luminância e relação de contraste. Pares essenciais são normalizados para:
- 7:1 em textos principais e cotas;
- 4,5:1 em textos secundários, campos editáveis e informações auxiliares;
- 3:1 para linhas gráficas quando aplicável.

Existe ainda uma auditoria automática de contraste para textos HTML adicionados dinamicamente. Elementos abaixo do limite recebem uma correção local derivada pelo próprio controlador, sem criar uma nova paleta paralela.

## Hierarquia e sobreposição
A camada `app/theme-engine.css` define papéis claros para:
- conteúdo;
- overlays do viewport;
- popovers;
- chrome/toolbars;
- modais;
- camadas críticas.

Foco por teclado usa um único token universal e não depende do tema.

## Tema claro e escuro
O botão de tema passa a chamar o controlador. Ao trocar de tema, são atualizados:
- menus e painéis;
- inputs e selects;
- dialogs e popovers;
- Outliner e Inspector;
- Sketch;
- viewport;
- grade 3D;
- hover/seleção do modelo;
- cotas;
- Medir;
- previews gerados em Canvas.

## Correção direta da falha das cotas
As placas de cota deixam de combinar fundo claro com texto claro. O fundo e o texto são escolhidos como um par semântico, e o texto passa por verificação de contraste antes de ser desenhado no CanvasTexture do Three.js.

## Build e fonte
`src/measure-tool.js` passa a ser a fonte autoritativa da ferramenta Medir. O build copia automaticamente essa fonte para `app/measure-tool.js`, evitando divergência entre código-fonte e executável.

## QA
A 14.28.11 adiciona:
- `qa142811-theme-engine.mjs`;
- verificação das relações de contraste em dark e light;
- bloqueio de cores hardcoded no Sketch e Medir;
- validação de que o theme engine CSS usa somente variáveis semânticas;
- round-trip real dark → light → dark no Browser Smoke;
- captura de auditoria do tema claro.
