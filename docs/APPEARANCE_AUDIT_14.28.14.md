# RV Cutter CAD — Auditoria Visual 14.28.14

Data: 2026-10-02

## Objetivo

Centralizar a aparência da interface em um único motor semântico e impedir que cores
legadas definidas diretamente em CSS continuem sendo a autoridade visual.

## Inventário estático da interface

- Botões: 139
- Inputs: 48
- Selects: 16
- Labels: 48
- Summaries: 13
- Dialogs: 7
- Sections: 7
- Asides: 3
- Spans: 129
- Parágrafos: 31
- Títulos H1–H4: 12
- IDs estáticos: 211
- Classes únicas: 176

## Dívida visual encontrada

- app/style.css: 407 declarações de cor fixas.
- app/ui-v4.css: 151 declarações de cor fixas.
- app/theme-engine.css: 0 declarações de cor fixas.
- app/appearance-engine.css: 0 declarações de cor fixas.
- src/ui.mjs: 0 cores fixas de interface.
- src/viewer.mjs: 0 cores fixas de interface.
- src/editor.mjs: 0 cores fixas de interface.
- src/measure-tool.js: 0 cores fixas de interface.

As cores de src/presentation.mjs são intencionais: pertencem aos estilos de apresentação
do modelo, não ao tema da interface.

## Arquitetura após a revisão

1. theme-controller.mjs
   - única fonte de tokens de claro/escuro;
   - normaliza contraste de textos, estados, desabilitados e status;
   - auditoria WCAG runtime.

2. appearance-controller.mjs
   - atribui papel semântico a cada elemento relevante;
   - cobre também elementos criados dinamicamente;
   - detecta superfícies legadas com fundo/borda próprios;
   - persiste relatório em localStorage: rv-appearance-audit-v1;
   - expõe window.RVAppearance.audit().

3. theme-engine.css
   - aparência temática por componentes existentes;
   - somente tokens semânticos.

4. appearance-engine.css
   - autoridade final por papel contextual;
   - carregado depois de todo CSS legado;
   - controla normal, hover, ativo, foco e desabilitado.

## Papéis contextuais principais

- surface-chrome
- surface-panel
- surface-elevated
- surface-viewport
- surface-neutral
- button-neutral
- button-primary
- button-accent
- button-danger
- button-card
- field
- field-control
- text-title
- text-primary
- text-secondary
- text-muted
- badge
- status
- summary
- sketch-ui

## Correções do Sketch nesta revisão

- origem visual passa a representar o ponto real (0,0), não o centro do perfil;
- eixo X e eixo Y passam a usar o sistema real do Sketch;
- origem entra na busca de snap com prioridade própria;
- eixo X e eixo Y aceitam snap contínuo por projeção;
- snap na origem cria restrição coincidentOrigin;
- snap nos eixos cria restrição pointOnAxis;
- solver, diagnóstico de GL e badges conhecem essas restrições;
- feedback visual mostra Origem (0,0), Eixo X ou Eixo Y antes do clique.

## Critério de regressão

Toda nova revisão visual deve:
- manter 0 cores fixas em theme-engine.css e appearance-engine.css;
- manter ui/editor/viewer/measure sem cores fixas de interface;
- executar qa142814-appearance-sketch.mjs;
- executar qa-sketch-snapping.mjs;
- registrar alteração neste documento ou em nova entrada de versão.
