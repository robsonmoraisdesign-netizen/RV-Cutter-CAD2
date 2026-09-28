# RV Cutter CAD 14.27.0 — Workspace unificado e arquitetura Sketch → Função → Corpo

## Decisão estrutural

A partir da 14.27, **Cortador de biscoito não é mais o objeto-base do projeto**. Ele passa a ser uma função paramétrica aplicada a um Sketch.

A hierarquia canônica do projeto passa a ser:

1. **Sketch** — fonte geométrica 2D editável.
2. **Funções** — operações paramétricas aplicadas ao Sketch. A primeira é `cookie-cutter` / “Cortador de biscoito”.
3. **Corpos/peças** — resultados 3D produzidos pelas funções.

Essa separação prepara o RV Cutter para múltiplas funções e múltiplos resultados no mesmo projeto sem vincular toda a arquitetura ao cortador.

## Compatibilidade

Projetos antigos `rv-cad-13` continuam válidos. Ao abrir um projeto anterior sem `features`, cada objeto legado é migrado em memória para um Sketch com uma função `cookie-cutter` contendo os parâmetros existentes.

Projetos criados na 14.27 usam `projectType: feature-workspace`. Um Sketch novo ou importado nasce sem função 3D; o usuário escolhe quando aplicar “Converter em cortador”.

Durante a transição, `node.params` permanece como alias de runtime dos parâmetros da função Cortador para preservar o motor geométrico existente. A fonte persistida da nova arquitetura é `features[].params`.

## Workspace

Sketch e Modelo deixam de ser workspaces separados. O Modelo é o espaço gráfico principal. Ao iniciar/editar um Sketch:

- o mesmo viewport permanece montado;
- o editor SVG aparece no espaço gráfico;
- a ribbon e o inspector de Sketch aparecem por contexto;
- “Finalizar Sketch” retorna ao Modelo;
- a aba Sketch 2D deixa de ser uma aba visível.

A árvore lateral passa a apresentar Sketches, funções e corpos gerados.

## Importação

A separação de figuras importadas continua disponível. Cada figura escolhida vira um Sketch independente. Nenhuma função 3D é aplicada automaticamente.

## Correção 3D / Apresentação

A 14.26 podia calcular a geometria e ainda exibir o viewport vazio. A 14.27 reforça a montagem e o redimensionamento do canvas WebGL após transições de visibilidade e inclui diagnóstico de host, canvas, grupos, malhas, draw calls e amostras do framebuffer.

O browser QA agora falha se o Modelo estiver com geometria calculada mas sem renderização real.

## Seleção no Sketch

A seleção não depende mais apenas do elemento SVG invisível atingido pelo ponteiro. Para Select, Trim, Extend e Dimension, o editor calcula a entidade geométrica mais próxima dentro de uma tolerância em pixels e escolhe a mais próxima. O hit target SVG foi reduzido de 12 px para 8 px para evitar que entidades próximas roubem a seleção.

## Próximos passos estruturais

- permitir múltiplas funções encadeadas no mesmo Sketch;
- seleção explícita de Feature na árvore e inspector específico por Feature;
- separar completamente escala/propriedades do Sketch dos parâmetros de fabricação;
- dependências entre Sketches e Project/Use;
- corpos independentes e operações entre corpos;
- solver e ferramentas CAD adicionais já mapeadas no roadmap.
