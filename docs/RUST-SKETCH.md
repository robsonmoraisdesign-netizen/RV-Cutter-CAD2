# RV Cutter CAD 14.29.0 — Rust Sketch preview 1

Base: `fix/14.28.28-preset-management`, commit `9b9957d312c8474882b5df7fde61179eb8cf5885`. O pacote-fonte dessa branch identifica sua versão como 14.28.19. A integração foi preparada em uma branch separada.

## O que mudou

O núcleo do Sketch usa Rust compilado para WebAssembly. Foram integrados `solidcraft-sketch` e `solidcraft-geom` do SolidCraft 0.15.0, fixados no commit `fa691707c224cae580c42201ed3a22d5e4b8c716`. O ZIP Windows fornecido foi analisado juntamente com o código público correspondente. Não se executa nem se incorpora o EXE do SolidCraft: o aplicativo incorpora as bibliotecas geométricas.

- Resolução simultânea de restrições e cotas, detecção de conflitos e graus de liberdade.
- Interseções analíticas entre linhas/círculos/arcos e aparar somente o intervalo clicado.
- Prolongar linhas até uma interseção pertencente ao limite desenhado.
- Bézier preservada como curva após aparar; interseções aproximadas por subdivisão adaptativa, erro alvo de 0,001 mm e profundidade máxima 16.
- Detecção de perfis fechados pelo SolidCraft; discretização de curvas com tolerância de 0,01 mm.
- Conversão automática de contornos vetorizados de imagens/SVG em linhas nativas editáveis. A migração só é gravada na primeira edição, junto com o histórico de desfazer.
- Arrastar um vértice importado mantém as extremidades conectadas do mesmo contorno.
- Diagnóstico de restrições atualizado após alterações no mesmo documento.

A causa do Aparar indisponível era a separação entre `legacyLoops` importados e `entities` usados pelas ferramentas nativas. Os dois fluxos agora encontram a mesma geometria editável. O bitmap continua sendo vetorizado; aparar opera no vetor resultante, não nos pixels.

## Como usar

Extraia toda a pasta do pacote Windows e abra `RV Cutter CAD.exe`. Importe PNG/JPG ou SVG, entre no Sketch, desenhe uma linha/curva que cruze o contorno e use Aparar no trecho desejado. Sem interseções internas, Aparar remove a entidade inteira. Use Prolongar próximo à extremidade de uma linha. Desfazer/refazer preservam o estado do Sketch. Perfis abertos não geram um corpo fechado; feche o contorno antes de converter em cortador.

## Escopo e limites

Esta é uma migração do núcleo geométrico do Sketch, não uma reescrita completa do programa. Interface, seleção, eventos de mouse, gerenciamento do documento, vetorização e motor 3D Manifold ainda usam JavaScript/Electron. A aplicação não inclui o kernel B-rep, a interface egui nem todas as ferramentas do SolidCraft/FreeCAD.

Até 8.000 entidades por Sketch e Bézier com 2 a 10 pontos de controle (limite do núcleo integrado). Prolongar nesta versão atua em linhas. Esboços subdefinidos podem mover ambas as entidades para satisfazer uma relação: fixe a geometria que deve permanecer imóvel. As opções antigas `curveSegments`, `tolerance` e `maxIterations` são aceitas pela ponte para compatibilidade, mas o cálculo usa as tolerâncias e a política interna documentadas acima/do SolidCraft.

## Compilar

Requisitos: Node.js 22+, Rust 1.99.1 e compilador/linker nativo disponível para instalar wasm-bindgen-cli.

```sh
npm ci
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli --version 0.2.105 --locked
npm run build
cargo test --manifest-path rust/sketch-core/Cargo.toml --locked
npm run test:sketch
node qa-browser-cdp.cjs
npm start
```

Em Windows x64, execute `node scripts/package-windows.cjs` após o build. `--cross` aceita apenas um runtime oficial Windows PE x64 previamente instalado em `node_modules/electron/dist`; não equivale a testar o aplicativo em Windows.

O bootstrap aguarda o WASM. Se não conseguir inicializá-lo, apresenta erro explícito; não retorna silenciosamente ao solver JavaScript.

## Validação desta entrega

Passaram os testes Rust nativos, as seis suítes de Sketch e o teste CDP completo da interface: desenho, cotas, desfazer/refazer, persistência, PNG real + vetorização + aparar por mouse, importação múltipla, geração 3D, apresentação e STL. Os testes de sistemas subdefinidos foram atualizados para medir as relações geométricas; não pressupõem que o primeiro objeto fique imóvel sem uma restrição Fixar.

`npm test` não está totalmente verde: `qa13-geometry.mjs` detecta uma aresta não manifold em um cenário regional do cortador. O cálculo 3D desse cenário não foi alterado por esta migração; a exportação continua bloqueada quando a malha é inválida. Consulte VALIDACAO.txt para outros resultados da suíte geral.

Pacote Windows montado em Linux com o runtime oficial Electron 41.0.0, estrutura PE x64 verificada. Abertura nativa do executável em Windows não foi validada neste ambiente. Trate esta entrega como prévia e valide seus projetos antes de adotar como versão de produção.

## Licenças

SolidCraft: https://github.com/tangency-labs/solidcraft — MIT OR Apache-2.0. Licenças e NOTICE preservados em `docs/licenses` e no pacote. As dependências Rust são fixadas por Cargo.lock. A licença do projeto RV Cutter permanece UNLICENSED.
