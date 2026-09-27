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

## Integração Sketch 14.23.2

`editor.mjs` usa `sketch/controller.mjs` para transações sobre o objeto ativo. `sketch/document.mjs` resolve entidades e combina perfis derivados com contornos legados; `sketch/diagnostics.mjs` calcula estado de restrições por componente. O documento nativo fica em `object.sketch`, separado dos `loops` derivados consumidos pelo motor. A serialização, histórico e validação de projeto preservam o documento. Converter em contornos é uma operação explícita e desfazível.

A versão da interface é injetada por `scripts/build.mjs` a partir de `package.json`. `ENGINE_VERSION` só muda quando o contrato do cálculo geométrico mudar. Não usar versão de aplicação para invalidar caches de sólidos sem necessidade.
