# Arquitetura RV Cutter CAD

## Baseline

A arquitetura de referência é a versão 14.22.0.

```text
Interface / Workspace
        ↓
src/ui.mjs
        ↓
estado paramétrico + dependências
        ↓
src/geometry.mjs / worker
        ↓
Manifold
        ↓
malha
        ↓
src/viewer.mjs / Three.js
```

## Sketch 2D

O Sketch deve evoluir dentro da arquitetura existente. Não é permitido criar uma segunda aplicação, overlay paralelo ou um editor independente injetado sobre o programa.

Direção arquitetônica:

```text
SketchDocument
├── entities
│   ├── Line
│   ├── Circle
│   ├── Arc
│   ├── Spline
│   └── Text
├── constraints
├── dimensions
└── references
        ↓
solver
        ↓
resolved profiles
        ↓
geometry pipeline existente
```

Os `loops` deixam de ser a única representação autoral do Sketch e passam gradualmente a ser uma saída resolvida para o motor de fabricação.

## Regra de release

`fonte versionado → build → testes → artefato Windows`

Nenhuma correção pode existir somente no executável.
