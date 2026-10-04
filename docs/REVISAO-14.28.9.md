# RV Cutter CAD 14.28.9 — preset completo e estabilidade de edição em lote

## Presets completos
- presets novos usam schema v2;
- o preset salva o estado paramétrico completo da função, incluindo modo, dimensões, chanfro, relevo normal/invertido, separação do relevo e ajustes locais da lâmina;
- aplicar um preset substitui de forma consistente os parâmetros de cada função no escopo escolhido;
- a função e o Sketch voltam a compartilhar o mesmo objeto de parâmetros após a aplicação, evitando estados híbridos.

## Atualização em lote
- todos os objetos de uma alteração em lote ficam protegidos contra descarte de malha até o término da operação;
- o limite de memória deixa de liberar objetos que continuam visíveis;
- descarte automático é restrito a objetos já ocultos e fora do lote;
- o limite suave foi elevado para 384 MB para evitar churn em cenas com várias peças.

## Sem sumiço durante reconstrução
- a geometria válida anterior permanece visível enquanto a nova versão é calculada;
- se uma reconstrução falhar, o objeto não desaparece: a geometria anterior continua visível e o erro é informado;
- itens explicitamente enviados para um lote são reconstruídos mesmo se estiverem ocultos, garantindo que “Todos” realmente receba o preset inteiro.

## Compatibilidade
- presets antigos continuam carregando via migração de parâmetros;
- a 14.28.9 também inclui as correções anteriores de importação múltipla, Mostrar todas, contraste, visual CAD e arestas ocultas.
