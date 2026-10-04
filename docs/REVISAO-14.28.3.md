# RV Cutter CAD 14.28.3 — UI v4 MASTER COMPLETE

Esta versão recupera e implementa a lógica estrutural do layout aprovado **RV_Cutter_CAD_UI_v4_MASTER_COMPLETE**.

## Workspaces persistentes
- Início
- 3D
- Sketch 2D
- Apresentação

O Sketch 2D volta a ser um workspace visível, sem perder o modelo, a seleção ou a árvore do projeto.

## Menus do Sketch
A barra plana foi substituída pela organização aprovada:
- Criar
- Modificar
- Restringir
- Cota
- Referência
- Diagnóstico

As ferramentas existentes continuam ligadas ao mesmo editor e solver.

## Ambiente 3D
O seletor de tipo de peça foi movido do inspector para o topo do viewport, seguindo o fluxo do layout v4.

## Inspector
O painel de propriedades agora possui os níveis:
- Essencial
- Avançado
- Especialista

A organização é contextual e não duplica o motor paramétrico.

## Apresentação
Os estilos Ilustrado, Técnico e Croqui aparecem como seleção visual no viewport e continuam sincronizados com o painel detalhado de apresentação.

## Compatibilidade
A função 14.28.2 **Separar relevo da base** foi preservada.
Nenhum cálculo de geometria, exportação STL, Sketch ou catálogo foi removido.
