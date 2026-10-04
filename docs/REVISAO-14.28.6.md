# RV Cutter CAD 14.28.6 — contraste global e CAD vivo

## Interface
- tema escuro revisado para eliminar a aparência lavada;
- fundo/chrome/painéis mais escuros;
- títulos e textos principais em branco real;
- bordas e estados ativos com contraste maior;
- teal da interface mais saturado;
- Outliner, parâmetros, menus, tabs e botões com hierarquia mais clara.

## Correção grave de layout
O seletor **Tipo de peça** e o cartão **Objeto ativo** não compartilham mais a mesma faixa vertical.
Quando o seletor está visível, o título do objeto é deslocado para baixo e limitado em largura, eliminando a sobreposição.

## Visual CAD
- cores por componente deixam de ser misturadas com azul pastel;
- Base do cortador, Lâmina, Base do carimbo e Relevo usam suas cores reais e saturadas;
- relevo e lâmina usam resposta de luz ligeiramente diferente para destacar saliências;
- iluminação CAD ficou menos ambiente e mais direcional, aumentando leitura de volume;
- luzes foram neutralizadas para evitar filtro azul/cinza.

## Arestas
As arestas CAD não usam mais linhas simples coplanares com a face.
Agora são desenhadas como linhas de tela com pequeno **depth bias**, reduzindo z-fighting/pontilhado sem alterar a geometria ou o STL.

## Preservado
- suavização visual da triangulação da 14.28.5;
- arestas geométricas reais;
- malha triangular de diagnóstico;
- múltiplos objetos / Outliner;
- UI v4 MASTER;
- Separar relevo da base.
