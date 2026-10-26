# RV Cutter Native — 15.0.0 alpha 1

Primeira etapa da reconstrução paramétrica em Rust. Aplicativo desktop nativo
com documento, solver de Sketch e motor B-rep do SolidCraft, revisão
fa691707c224cae580c42201ed3a22d5e4b8c716. Interface nativa SolidCraft/egui
reaproveitada; sem Electron ou JavaScript neste aplicativo.

## Executar
Instale Rust estável (>=1.95) e, no Windows, Visual Studio Build Tools com C++.
Na raiz do repositório:

```
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
- A interface e os geradores específicos de cortadores, carimbos, logotipos,
  presets e lâminas procedurais do RV ainda não foram portados.
- Projetos antigos `rv-cad-13` migram somente contornos avaliados; não recuperam
  automaticamente suas cotas, restrições ou histórico de operações.
- A vetorização por limiar é adequada a desenhos com contraste. Fotografias
  podem exigir preparação. Curvas rasterizadas resultam em segmentos,
  não em arcos analíticos reconstruídos.
- O aplicativo Electron existente continua disponível como versão anterior.
- Esta é uma versão de desenvolvimento; guarde cópias dos projetos originais.

Licenças e atribuições: `../docs/licenses/`. SolidCraft é MIT OR Apache-2.0;
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

Na barra RV, abra **CORTADORES**, crie/importe um Sketch fechado e
escolha **GERAR CORTADOR**. O gerador usa duas extrusões *Thin* nativas
SolidCraft: uma lâmina de espessura/altura ajustáveis e uma base mais larga
e mais baixa unida à lâmina. Os quatro valores são parâmetros nomeados
`rv_lamina_altura_<id>`, `rv_lamina_espessura_<id>`,
`rv_base_altura_<id>` e `rv_base_largura_<id>`; alterá-los por
**Parâmetros** recalcula o B-rep. A criação é uma transação desfeita
por uma única operação de histórico. Apenas Sketches abertos com até
800 curvas são aceitos nesta etapa; contornos desconectados, furos e
geometrias excessivamente complexas podem exigir correção manual.

A ferramenta CORTADORES é um painel do shell RV sobre a interface egui
SolidCraft, **ainda não** uma aba injetada diretamente no registro
interno do ribbon da dependência SolidCraft. A integração visual como
tab nativo independente está planejada sem alterar o design-system original.

### Imagem → Sketch

PNG/JPG podem ter **mais de 4 MP**: o Rust agora decodifica a imagem e
reduz automaticamente apenas a amostragem geométrica até 4 MP, preservando
as proporções e o tamanho físico selecionado em **Imagem mm**. O vetor
gerado é Sketch nativo editável, não uma figura fixada no viewport.

Com **Cota automática** ativa, aplica uma cota dirigível no maior eixo
horizontal/vertical do contorno importado. Caso o solver rejeite cotas
naquele contorno, desative a opção para importar sem cota, edite o Sketch
e aplique dimensões manualmente. A seleção do tamanho físico continua
funcionando independentemente da cota automática.

Os limites de segurança ainda se aplicam: arquivo comprimido de até
32 MiB, imagem original com até 64 milhões de pixels, até 16.384 px
por lado, máximo de 1.000 regiões e 8.000 vértices finais editáveis.
Um desenho muito ruidoso pode exceder os limites de complexidade
mesmo com redimensionamento automático.

Migração progressiva: ver `MIGRATION-RV-ROADMAP.md`.
