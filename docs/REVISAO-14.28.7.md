# RV Cutter CAD 14.28.7 — múltiplas imagens, visibilidade e resposta rápida

## Layout
- removido um segundo `id="viewport"` duplicado;
- o título do objeto mede a altura real do seletor **Tipo de peça** antes de se posicionar;
- ResizeObserver mantém os dois blocos sem sobreposição em diferentes larguras.

## Mostrar todas / Isolar
- ocultar e isolar não descartam mais malhas;
- grupos GPU permanecem carregados e apenas mudam `visible`;
- **Mostrar todas** encerra isolamento e reapresenta imediatamente o que ainda está em memória;
- reconstrução ocorre somente para peças realmente liberadas pelo limite de memória ou desatualizadas.

## Desempenho
- gravação IndexedDB do cache foi retirada do caminho crítico da atualização;
- resultado aparece na cena antes da escrita persistente;
- debounce de geração caiu de 220 ms para 80 ms;
- ocultar/mostrar não provoca reconstrução desnecessária.

## Importação múltipla
- seletor aceita vários PNG, JPG, WebP e SVG de uma vez;
- todos os arquivos entram em uma revisão única;
- cada figura vira Sketch independente;
- os nomes preservam a imagem de origem;
- todos entram no mesmo Outliner e na mesma cena.

## Contraste
- interface ganhou uma segunda passada de contraste;
- menos cinza médio, chrome mais escuro e textos/estados ativos mais evidentes.
