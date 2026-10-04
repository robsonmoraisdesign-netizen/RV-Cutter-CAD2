# RV Cutter CAD 14.28.5 — visual CAD técnico

Esta versão altera somente a representação visual do sólido e o cache de dados de exibição. A geometria de fabricação/STL permanece a mesma.

## Visual padrão
- novo estilo **CAD técnico · faces + arestas** como padrão no workspace 3D;
- faces azul-claro com acabamento fosco;
- fundo neutro claro;
- arestas de característica escuras;
- componentes continuam podendo ser diferenciados por tom, mas sem aparência multicolorida agressiva.

## Chanfro e triangulação
- vértices coincidentes da tesselação são soldados somente para cálculo das normais de exibição;
- arestas internas de triangulação não são desenhadas no modo CAD;
- arestas reais de mudança geométrica continuam visíveis;
- cap, parede e chanfro continuam separados em creases físicas;
- o modo **Malha triangular** continua disponível para diagnóstico.

## Arquitetura
A malha usada em STL e operações geométricas não é suavizada nem alterada.
A suavização ocorre apenas em `renderData`.
As arestas CAD são pré-calculadas no worker com limiar angular para evitar peso no thread da interface.

## Compatibilidade
Projetos antigos que ainda estavam no visual padrão PLA migram para CAD técnico ao abrir.
Projetos que já usavam fosco/silk ou um visual PLA personalizado são preservados.
