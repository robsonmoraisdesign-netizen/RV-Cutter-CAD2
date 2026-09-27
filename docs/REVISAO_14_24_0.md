# Revisão 14.24.0 — Sketch CAD contextual e ciclo de vida de projeto

Base: `feature/sketch-phase1-integrated`. Continuação da issue #2. O motor geométrico permanece compatível com a baseline 14.22.0; a versão do aplicativo é 14.24.0.

## O que mudou

- Workspace Sketch redesenhado para fluxo CAD, com `Criar / Modificar / Restringir / Cota`, inspector contextual e canvas claro com grade/eixos.
- Linha, retângulo, círculo e arco permanecem entidades semânticas, não simples nuvens de pontos.
- Cotas driving e de referência aparecem no canvas e no inspector.
- Restrições: horizontal, vertical, coincidente, paralela, perpendicular, tangente (linha + círculo/arco), igual, concêntrica, colinear e fixar.
- Inferência horizontal/vertical durante criação de linha.
- Snap de extremidades e centros cria Coincidente persistente quando aplicável.
- Geometria de construção não entra no perfil de fabricação.
- Estado do Sketch: livre, parcialmente definido, totalmente definido ou conflito.
- Ferramentas legadas de contorno permanecem acessíveis apenas de forma contextual, evitando misturar o fluxo CAD com pintura/edição destrutiva.

## Saída e troca de projeto

Toda saída do projeto para Biblioteca, criação de outro projeto ou abertura de `.rvcad` passa pelo diálogo:

- **Salvar**: persiste o projeto no catálogo antes de sair;
- **Não salvar**: descarta as alterações correntes e limpa a recuperação;
- **Cancelar**: permanece no projeto atual.

Ao continuar a troca, `resetSession()` encerra worker, rejeita operações pendentes, cancela geração/importação, limpa a cena e libera as referências do projeto anterior antes de carregar o próximo.

Durante edição, o salvamento automático grava apenas um snapshot de recuperação. Isso evita que “Não salvar” seja neutralizado por uma gravação silenciosa no catálogo.

## Validação exigida

- sintaxe JS/MJS/CJS;
- suíte `npm test` Windows e Linux;
- QA específico de transições Save/Discard/Cancel;
- QA de restrições CAD;
- QA de snap persistente;
- QA de contrato da interface;
- smoke browser real: desenhar, cotar, salvar, fechar sessão, reabrir da biblioteca, descartar e confirmar worker encerrado;
- pacote Windows x64 derivado do mesmo commit.

## Limites desta revisão

Esta revisão não afirma paridade total com Onshape. Ainda ficam para incrementos seguintes ferramentas como spline/Bézier, texto paramétrico, trim/extend, fillet/chamfer, mirror/pattern e solver geométrico mais geral. A regra é que cada comando só entra na interface quando possuir estado, persistência, comportamento e teste reais.
