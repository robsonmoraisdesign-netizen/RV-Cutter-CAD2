# RV Cutter CAD 14.28.4 — múltiplos objetos

Corrige a regressão de fluxo com várias artes.

- Outliner volta a ser explícito e mantém altura útil para a lista de Sketches.
- Ao importar várias artes, o primeiro Sketch entra em edição e os demais continuam visíveis no Sketch 2D como referências.
- As referências são clicáveis para trocar o Sketch ativo sem perder o contexto das outras artes.
- A visibilidade de referência 2D independe do olho do resultado 3D.
- Um Sketch inicial vazio não força “Adicionar ao projeto atual”.
- Nova ação **Converter todos em cortador** gera todos os Sketches com geometria na mesma cena 3D.
- Mantidos UI v4 MASTER, Sketch paramétrico, exportação, presets e “Separar relevo da base”.
