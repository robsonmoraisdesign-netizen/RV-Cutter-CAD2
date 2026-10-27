## Correção de importação e seleção de Sketch

- Simplificação padrão: **1,0 px**. O traçado mantém os extremos do desenho e
  todos os contornos detectados. Se ultrapassar 8000 vértices, tenta simplificação
  adaptativa até 3 px antes de rejeitar. Ruído continua desligado por padrão.
- A cota proporcional opcional não bloqueia mais uma imagem válida: acima de 256
  curvas (ou se o solver rejeitar a cota), preserva o Sketch no tamanho escolhido
  e informa que a cota não foi aplicada. Isso não cria um parâmetro de escala
  posterior para esses desenhos complexos.
- **CORTADORES → Gerar cortador → Sketch de origem** lista os Sketches não
  suprimidos do documento, incluindo os concluídos. Escolha um nome, ajuste as
  quatro medidas e clique GERAR CORTADOR. Não é necessário abrir o Sketch antes.
- O gerador ainda aceita até 800 curvas e usa os contornos do Sketch selecionado.
  Importar uma ilustração inteira não equivale a escolher somente sua silhueta:
  detalhes internos também fazem parte do Sketch. A seleção de regiões específicas
  para fabricação continua pendente.

## Atualização em validação: ribbon e escala proporcional

A aba CORTADORES integra o ribbon Design do SolidCraft. O motor permanece em Rust;
a extensão da interface usa a mesma revisão fixada do motor e não executa JavaScript.

- Imagem mm com Cota automática cria `rv_tamanho_<id>`. Edite esse parâmetro para
  redimensionar o contorno e recalcular o cortador dependente proporcionalmente.
- A cota proporcional usa restrições e expressões nativas, sem fixar todos os pontos.
  O contorno fica totalmente restringido: para alterar livremente sua forma, desative
  Cota automática antes de importar ou edite/remova as relações pertinentes.
- A restrição automática aceita até 256 curvas para limitar o custo do solver.
  Contornos mais complexos são importados sem essa cota, com aviso, ou podem ser simplificados.
- PNG/JPG: até 64 milhões de pixels de entrada, dimensões até 16384 por eixo e arquivo
  até 32 MB; grade de traçado adaptativa até 4 MP. Simplificação é medida em pixels
  dessa grade; Ruído remove regiões e furos abaixo da área indicada. Zero preserva
  todas as regiões detectadas. A transparência é composta sobre branco antes da redução.
- O traçado raster continua poligonal. Reconstrução analítica de arcos, prévia de
  vetorização, lâminas procedurais, carimbos e rolos ainda não foram implementados.

### Compilar esta revisão

Execute `python native/prepare-solidcraft.py` na raiz antes dos comandos Cargo abaixo.
Requer Python 3.12+ e Git apenas na compilação. A preparação baixa a revisão fixada
SolidCraft e aplica `native/patches/solidcraft-host-ribbon.patch` somente à integração
UI. O diretório gerado `native/vendor/` não deve ser versionado. Se o patch mudar,
remova esse diretório gerado e prepare novamente.

### Pacote Windows

A CI executa os testes, compila e verifica se a aplicação cria uma janela e permanece
aberta. Isso não equivale a testar interativamente todas as ferramentas. O artefato
portátil coloca `RV-Cutter-Native.exe` na raiz: extraia o ZIP inteiro e execute-o.
Não requer Rust, Python, Node ou Electron no computador do usuário.

---

# RV Cutter Native — 15.0.0 alpha 1

Primeira etapa da reconstrução paramétrica em Rust. Aplicativo desktop nativo
com documento, solver de Sketch e motor B-rep do SolidCraft, revisão
fa691707c224cae580c42201ed3a22d5e4b8c716. Interface nativa SolidCraft/egui
reaproveitada; sem Electron ou JavaScript neste aplicativo.

## Compilar a partir do código-fonte
Instale Rust estável (>=1.95) e, no Windows, Visual Studio Build Tools com C++.
Na raiz do repositório:

```
python native/prepare-solidcraft.py
cargo run --manifest-path native/Cargo.toml --release
cargo run --manifest-path native/Cargo.toml --release -- --demo
cargo run --manifest-path native/Cargo.toml --release -- --import desenho.png
cargo test --manifest-path native/Cargo.toml --no-default-features
```

Para gerar o EXE:
```
cargo build --manifest-path native/Cargo.toml --release
```
Saída: `native/target/release/RV-Cutter-Native.exe` no Windows.
O workflow RV Native Rust Windows executa os testes antes de publicar o artefato.

## Fluxo de Sketch
1. Abra um Sketch XY ou importe contornos pela barra RV.
2. PNG/JPG são vetorizados em Rust por limiar de luminância; ajuste Limiar e
   Imagem mm antes de importar. SVG importa curvas vetoriais nativas.
3. Use as ferramentas de Sketch, incluindo aparar nas interseções, sobre essas
   curvas. A imagem é convertida em segmentos editáveis, não apenas exibida.
4. Aplique cotas e restrições; encerre o Sketch e selecione as regiões desejadas
   na extrusão. Para preservar furos, selecione somente a região de material:
   selecionar também o interior do furo o preenche.
5. Em Parâmetros, altere as expressões usadas nas cotas e operações. O exemplo
   `--demo` vincula largura_rv, profundidade_rv e altura_rv ao sólido.

A importação é uma operação única de desfazer. Se um item de um lote falhar,
o documento e seu histórico são restaurados. Importações grandes são limitadas
para proteger memória e tempo de processamento.

## Escopo e limitações
- Esta alpha inicia a migração pelo Sketch e modelagem paramétrica nativa.
- Cortadores têm uma primeira implementação nativa. Carimbos, logotipos,
  presets e lâminas procedurais do RV ainda não foram portados.
- Projetos antigos `rv-cad-13` migram somente contornos avaliados; não recuperam
  automaticamente suas cotas, restrições ou histórico de operações.
- A vetorização por limiar é adequada a desenhos com contraste. Fotografias
  podem exigir preparação. Curvas rasterizadas resultam em segmentos,
  não em arcos analíticos reconstruídos.
- O aplicativo Electron existente continua disponível como versão anterior.
- Esta é uma versão de desenvolvimento; guarde cópias dos projetos originais.

Licenças e atribuições: `licenses/` no pacote portátil ou `docs/licenses/` no repositório. SolidCraft é MIT OR Apache-2.0;
consulte também as licenças das dependências distribuídas.


## Automação paramétrica RV

A barra RV oferece Restringir automaticamente e Concluir com restrições, usando
os comandos AutoConstrain nativos. Eles inferem relações próximas e acrescentam
cotas; revise as relações sugeridas para confirmar a intenção do seu desenho.

Operação paramétrica RV carrega arquivos no formato `rv-parametric-recipe-1`.
O exemplo `examples/placa-parametrica.json` cria uma placa e registra largura,
profundidade e altura como expressões. Altere esses parâmetros para recalcular
o sólido. Cada operação inteira pode ser desfeita; uma falha restaura o documento.
Os nomes do exemplo precisam estar livres (use um documento novo para repeti-lo).

Uma nova função precisa declarar seus comandos, cotas e dependências. O motor
recalcula as dependências declaradas, mas não converte código JavaScript antigo
nem deduz automaticamente a intenção de toda operação. Uma sequência com valores
fixos permanece fixa até que seus valores sejam ligados a parâmetros.

Consulte SKETCH-COMANDOS.md para o inventário de ferramentas do motor incluído.


## RV CORTADORES — primeira automação de fabricação

No ribbon Design, abra **CORTADORES**, crie/importe um Sketch fechado e
escolha **GERAR CORTADOR**. O gerador usa duas extrusões *Thin* nativas
SolidCraft: uma lâmina de espessura/altura ajustáveis e uma base mais larga
e mais baixa unida à lâmina. Os quatro valores são parâmetros nomeados
`rv_lamina_altura_<id>`, `rv_lamina_espessura_<id>`,
`rv_base_altura_<id>` e `rv_base_largura_<id>`; alterá-los por
**Parâmetros** recalcula o B-rep. A criação é uma transação desfeita
por uma única operação de histórico. Sketches selecionados, abertos ou concluídos, com até
800 curvas são aceitos nesta etapa; contornos desconectados, furos e
geometrias excessivamente complexas podem exigir correção manual.

A aba CORTADORES usa uma extensão do ribbon da interface egui SolidCraft.
Os controles compartilham o tema nativo; as métricas RV ficam em appearance.rs.

### Imagem → Sketch

PNG/JPG podem ter **mais de 4 MP**: o Rust agora decodifica a imagem e
reduz automaticamente apenas a amostragem geométrica até 4 MP, preservando
as proporções e o tamanho físico selecionado em **Imagem mm**. O vetor
gerado é Sketch nativo editável, não uma figura fixada no viewport.

Com **Cota automática** ativa, aplica uma cota dirigível no maior eixo
horizontal/vertical e vincula as demais medidas lineares ao parâmetro
`rv_tamanho_<id>`, preservando as proporções nas alterações posteriores. Caso o solver rejeite cotas
naquele contorno, desative a opção para importar sem cota, edite o Sketch
e aplique dimensões manualmente. A seleção do tamanho físico continua
funcionando independentemente da cota automática.

Os limites de segurança ainda se aplicam: arquivo comprimido de até
32 MiB, imagem original com até 64 milhões de pixels, até 16.384 px
por lado, máximo de 1.000 regiões e 8.000 vértices finais editáveis.
Um desenho muito ruidoso pode exceder os limites de complexidade
mesmo com redimensionamento automático.

Migração progressiva: ver `MIGRATION-RV-ROADMAP.md`.
