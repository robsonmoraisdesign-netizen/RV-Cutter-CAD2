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
- [x] Build reproduzível: `npm ci` + `npm run build` passaram no GitHub Actions em Linux e Windows
- [x] Sintaxe do fonte e runtime gerado passou em Linux e Windows
- [ ] Fixtures/assets binários e JSON pesados importados
- [ ] `npm test` completo aprovado
- [ ] Runtime Windows empacotado a partir do commit da baseline
- [ ] PR da baseline para `main`

## Diagnóstico do CI

O primeiro CI completo chegou corretamente até `npm test` em Linux e Windows.
A falha atual é **somente por fixture ausente**:

```text
Error: ENOENT: no such file or directory, open 'test-pig-loops.json'
```

Portanto o código-fonte compila, os bundles são gerados e a sintaxe passa. O próximo passo não é alterar o motor: é completar a importação dos assets históricos de QA.

## Caminho controlado para concluir a importação

Foi criado o workflow `.github/workflows/import-uploaded-baseline.yml`.

Ao adicionar o ZIP original:

```text
baseline-upload/RV_Cutter_CAD_14_22_CODIGO_FONTE.zip
```

na branch `chore/import-14.22`, o GitHub Actions:

1. valida que o pacote é 14.22.0;
2. localiza automaticamente a raiz aninhada do fonte;
3. importa examples/fixtures/JSONs necessários;
4. mantém `app/ui.js`, `app/worker.js` e `app/manifold.wasm` como artefatos derivados;
5. apaga o ZIP de staging;
6. commita a baseline completa;
7. dispara novamente o CI Linux/Windows.

Isso evita reconstruir manualmente arquivos binários pela API de texto do conector.
