# Revisão 14.26.0 — Sketch 2D Phase 2

## Meta

Aproximar a interação do Sketch das referências CAD solicitadas, preservando a arquitetura do RV Cutter CAD e o motor de fabricação da baseline 14.22.

## Implementado

- toolbar de Sketch ativo com ferramentas diretas;
- Line/Rectangle/Circle por sequência de cliques, e cadeia contínua de linhas;
- Arco de 3 pontos;
- Bézier multiponto sem converter prematuramente em nós soltos;
- seleção com hit target ampliado;
- box selection e crossing selection;
- Trim semântico, inclusive arrastando sobre múltiplos trechos;
- Extend de linhas até o limite mais próximo;
- Cota como ferramenta do canvas e edição inline;
- painel S de atalhos e atalhos D/M/L/R/C/A/B;
- inferência horizontal, vertical, coincidente, ponto médio e paralela; Shift suprime inferências;
- restrição Ponto médio persistente;
- visualização de entidades subdefinidas, definidas e em conflito;
- exibição opcional de símbolos de restrição;
- manutenção do inspector contextual e do Workspace System v4.

## Não declarado como concluído

Ainda não há paridade total com Onshape. Fillet, Chamfer, Break, Mirror, Pattern, Project/Use, dimensões angulares/entre duas entidades, texto paramétrico, spline avançada com continuidade/curvatura, Trim de Bézier e solver geométrico geral continuam para fases posteriores.

## Critério de aceite

Nenhuma ferramenta conta como pronta somente por existir na UI. Deve possuir entidade/estado real quando aplicável, persistência, comportamento, integração com undo/redo/projeto e QA automatizado.
