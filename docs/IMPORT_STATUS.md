# Importação da baseline 14.22

Branch: `chore/import-14.22`

## Estado atual

- [x] Repositório inicializado
- [x] Política source-first registrada
- [x] Branches `develop` e `feature/sketch-parametric` criadas
- [x] Issue de baseline criada
- [x] `package.json` e `package-lock.json` 14.22 importados
- [x] `src/` autoral completo importado
- [x] `app/` autoral importado
- [x] QA textual importado
- [x] Fixtures/assets binários e JSON pesados importados do ZIP original
- [x] ZIP de staging removido após a importação
- [x] Build reproduzível: `npm ci` + `npm run build` passaram no GitHub Actions em Linux e Windows antes da importação dos fixtures
- [x] Sintaxe do fonte e runtime gerado passou em Linux e Windows antes da importação dos fixtures
- [ ] `npm test` completo aprovado com a baseline integral
- [ ] Runtime Windows empacotado a partir do commit da baseline
- [ ] PR da baseline para `main`

## Importação integral do pacote

O ZIP original foi recebido em `baseline-upload/`, normalizado para o nome esperado e processado pelo workflow **Import uploaded 14.22 archive**.

Commit automático resultante:

`fbddaa490f98abf775a834610342d828b9253c4a`

Arquivos confirmados após a extração incluem:

- `test-pig-loops.json`
- `test-rose-loops.json`
- `fixtures/rosa-original.stl`
- `app/examples/pig.jpg`
- `app/examples/cow.jpg`
- `app/examples/flowers.png`

Os artefatos derivados `app/ui.js`, `app/worker.js` e `app/manifold.wasm` continuam fora do código-fonte versionado e devem ser produzidos pelo build.

## Próximo gate

Executar novamente o CI Linux/Windows sobre a baseline completa. O merge para `main` só poderá ocorrer após analisar todos os testes e registrar qualquer incompatibilidade histórica como problema conhecido ou corrigido.
