# RV Cutter CAD

Aplicativo desktop Windows para criação paramétrica de cortadores e carimbos 3D.

## Regra de arquitetura

**O código-fonte é a única fonte de verdade.** Toda alteração deve ser implementada primeiro no código-fonte versionado e somente depois refletida no executável/portable gerado a partir de um commit identificável.

A baseline inicial é a versão **14.22.0**, preservando o motor geométrico e a arquitetura existente antes da evolução do Sketch 2D.

## Fluxo de branches

- `main`: versões estáveis e baselines aprovadas.
- `develop`: integração de funcionalidades aprovadas.
- `feature/sketch-parametric`: evolução do Sketch 2D no modelo Onshape/Fusion.
- Outras features devem nascer de `develop`.

## Regras permanentes

1. Não criar overlays ou editores paralelos para contornar módulos existentes.
2. Novas funções de Sketch devem integrar-se a `src/editor.mjs`, `src/ui.mjs` e módulos de domínio próprios.
3. Não substituir o motor 3D quando a alteração for de UI/Sketch.
4. Nenhuma função confirmada pode desaparecer silenciosamente.
5. Problemas resolvidos permanecem registrados como testes anti-regressão.
6. Antes de release: sintaxe, QA, runtime, comparação visual e correspondência fonte/build.
