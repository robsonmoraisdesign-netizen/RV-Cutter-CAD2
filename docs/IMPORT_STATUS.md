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
- [x] Manifesto imutável da baseline criado com 61 arquivos e SHA-256
- [x] Checkout reproduzível Windows/Linux protegido por `.gitattributes`
- [x] `npm ci` + `npm run build` aprovados em Linux e Windows
- [x] Sintaxe do fonte e runtime gerado aprovada em Linux e Windows
- [x] `npm test` completo aprovado em Linux e Windows
- [x] Runtime derivado (`ui.js`, `worker.js`, `manifold.wasm`) gerado e validado
- [x] Portable Windows x64 montado pelo GitHub Actions a partir do fonte versionado
- [ ] PR da baseline para `main`
- [ ] Branch permanente `baseline/14.22` criada

## Importação integral do pacote

O ZIP original foi processado e resultou no commit automático:

`fbddaa490f98abf775a834610342d828b9253c4a`

A baseline foi depois validada no commit:

`268eb23420f9de5603d2c88941c7ffac887f6e38`

Arquivos históricos confirmados incluem:

- `test-pig-loops.json`
- `test-cow-loops.json`
- `test-rose-loops.json`
- `fixtures/rosa-original.stl`
- `app/examples/pig.jpg`
- `app/examples/cow.jpg`
- `app/examples/flowers.png`

Os artefatos derivados `app/ui.js`, `app/worker.js` e `app/manifold.wasm` permanecem fora do código-fonte versionado e são produzidos pelo build.

## Gates aprovados

GitHub Actions — **Baseline 14.22 CI**:

- Windows: PASS
- Ubuntu: PASS
- Integridade SHA-256 da baseline: PASS nos dois sistemas
- `npm test`: PASS nos dois sistemas
- Portable Windows x64: gerado com sucesso
- `SOURCE_COMMIT.txt`: gravado no pacote para rastreabilidade

Run de referência:

`36247533583`

Artifact Windows de referência:

`RV_Cutter_CAD_14_22_Windows_x64`

## Próximo gate

Criar a branch imutável `baseline/14.22`, abrir PR para `main`, revisar o diff e só então consolidar a baseline como ponto de partida oficial do desenvolvimento.
