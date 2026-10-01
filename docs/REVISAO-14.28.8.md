# RV Cutter CAD 14.28.8 — faces opacas e arestas ocultas

## Correção do efeito de “transparência”
A captura mostrava faces aparentemente transparentes porque o contorno CAD estava sendo deslocado demais para a frente no depth buffer.

Correções:
- faces do modelo são explicitamente `transparent=false`, `opacity=1`, `depthTest=true` e `depthWrite=true`;
- faces do modo de modelagem não usam mais `polygonOffset`;
- o deslocamento manual das arestas CAD caiu de 0.00042 para 0.000002;
- o polygon offset das arestas foi reduzido de -2 para -1;
- arestas continuam levemente destacadas para evitar z-fighting, mas arestas atrás de uma parede devem permanecer ocultas;
- geometria e STL não foram alterados.

## Preservado
- cores vivas por componente;
- visual CAD com arestas de forma;
- suavização de triangulação;
- múltiplas imagens;
- Mostrar todas sem reconstrução desnecessária;
- UI de alto contraste.
