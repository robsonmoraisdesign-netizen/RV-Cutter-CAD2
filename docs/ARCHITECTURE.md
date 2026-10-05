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

## Workspace Sketch 14.24

O Sketch 2D usa uma interface CAD contextual integrada ao editor existente:

```text
[ Selecionar ] [ Criar ▾ ] [ Modificar ▾ ] [ Restringir ▾ ] [ Cota ]
                                      ↓
                          SketchDocument semântico
                                      ↓
                        solver + perfis resolvidos
                                      ↓
                         motor geométrico 14.22
```

As entidades continuam semânticas durante edição e serialização. Cotas e símbolos de restrição aparecem no canvas; o inspector exibe propriedades da seleção. Inferências H/V e snap de pontos geram relações persistentes quando aplicáveis. Ferramentas legadas de contorno ficam em divulgação progressiva e exigem conversão explícita quando destruiriam a parametria.

## Ciclo de vida de projeto

Ao sair de um projeto para a Biblioteca, criar outro ou abrir um arquivo, a aplicação deve perguntar **Salvar / Não salvar / Cancelar**. “Não salvar” descarta as alterações correntes e a recuperação; “Cancelar” mantém a sessão; “Salvar” persiste o catálogo antes de fechar. Quando a saída continua, o projeto anterior é encerrado por completo: worker, jobs pendentes, geração, cena/GPU, histórico e referências de estado são liberados antes da abertura do próximo projeto.

## Sketch Phase 2 — 14.26

A experiência de edição deixa de ser um menu genérico de ferramentas e passa a seguir o modelo de um **Sketch ativo**: ferramentas de criação/modificação disponíveis diretamente, seleção CAD, inferências e cotas no canvas. A referência de interação é Onshape/Fusion, sem copiar sua identidade visual.

```text
Sketch toolbar
[Select] [Line] [Rectangle] [Circle] [Arc] [Bezier]
         [Trim] [Extend] [Construction] [Constraints] [Dimension]
                            ↓
                     SketchDocument
           Point / Line / Circle / Arc / Bezier
                            ↓
             constraints + dimensions + solver
                            ↓
                  resolved manufacturing profile
                            ↓
                    geometry pipeline 14.22
```

Regras desta fase:
- criação de linha, retângulo e círculo usa sequência de cliques e preview dinâmico;
- linha continua em cadeia com coincidência persistente entre segmentos;
- área invisível de captura é maior que o traço visual;
- janela esquerda→direita seleciona entidades totalmente contidas; direita→esquerda funciona como crossing selection;
- inferências H/V, coincidência, ponto médio e paralela viram relações persistentes quando aplicadas; Shift suprime inferências automáticas;
- Trim e Extend operam no modelo semântico, não em uma cópia destrutiva de pontos;
- Bézier multiponto permanece editável e é amostrada apenas na etapa de geração do perfil;
- estado visual de entidade é derivado do solver/diagnóstico: subdefinida, definida ou conflito;
- comandos ainda não implementados não devem aparecer como se estivessem prontos.



## 14.27 — Sketch → Função → Corpo

A unidade primária de autoria passa a ser o **Sketch**. Funções paramétricas referenciam o Sketch e produzem corpos/peças. “Cortador de biscoito” é a primeira Feature (`cookie-cutter`), não o tipo do projeto. A árvore do projeto deve representar explicitamente Sketch → Feature → Body e futuras Features devem entrar nesse modelo sem criar editores paralelos.

O workspace de Modelo é permanente. Editar um Sketch é um **estado contextual do mesmo espaço gráfico**, com toolbar/inspector próprios, e não um workspace 2D independente. Projetos legados são migrados por adaptador e o motor de geometria existente permanece atrás da Feature Cortador durante a transição.


## 14.28.16 — Logo paramétrica na base

A marca do fabricante é uma propriedade da Feature `cookie-cutter`, não parte da arte que marca o alimento. O texto é convertido em contornos vetoriais por `src/logo-text.mjs` e entra no mesmo pipeline Manifold da base do cortador.

```text
logoText / logoFont / logoSize / logoHeight
                    +
logoPosition (%) / logoOffset
                    ↓
          perfil vetorial do texto
                    ↓
borda real da base → posição por comprimento de arco
                    ↓
       tangente local + rotação legível
                    ↓
 aba de apoio + conector + texto elevado
                    ↓
        união booleana com a base
                    ↓
          um único corpo imprimível
```

A posição 0% é ancorada no centro inferior da borda externa; o avanço percorre a borda continuamente, começando pela lateral direita. A rotação é derivada da tangente local e é invertida em 180° quando necessário para impedir texto de cabeça para baixo. Alterações de logo invalidam apenas o nó de cortador/integrado; lâmina e perfis independentes permanecem reutilizáveis pelo grafo paramétrico.

A conversão texto→perfil fica no `worker` (`src/logo-text.mjs`). O worker rasteriza o texto com fontes do sistema em `OffscreenCanvas`, vetoriza o resultado e entrega apenas o perfil 2D para `src/geometry.mjs` por `options.logoProfile`. Assim a interface não carrega arquivos de fonte ou JSONs extras; um fallback geométrico determinístico mantém QA e ambientes sem canvas funcionais. O worker mantém um cache pequeno dos perfis por texto/fonte/tamanho.


## 14.28.17 — Biblioteca de fontes e base independente

A logo da base passa a separar explicitamente **tipografia** de **geometria da aba**. O tamanho das letras continua em `logoSize`, enquanto `logoBaseWidthExtra` adiciona largura somente à base que sustenta a marca. Assim uma palavra pequena pode ficar centralizada em uma aba visualmente mais larga, sem aumentar as letras.

A lista de fontes é centralizada em `src/logo-font-catalog.mjs`. O mesmo catálogo alimenta a interface e o worker, evitando ids duplicados ou divergência entre o nome escolhido e a geometria gerada. As famílias inspiradas na lista do Onshape incluem Allerta Stencil, Arimo, Balthazar, Baumans, Bebas Neue, Comic Neue, Courier Prime, Didact Gothic, Droid Sans Mono, Inconsolata, Inter, Michroma, M PLUS Rounded 1c, Noto Sans e variações CJK, além de Noto Serif.

O worker continua responsável pela vetorização do texto. Ele usa `OffscreenCanvas` e a melhor família disponível no Windows; quando a família exata não existe, o catálogo define um fallback visual compatível. Nenhum arquivo de fonte é incorporado ao projeto. O perfil resultante continua sendo uma geometria vetorial real usada pelo Manifold.

```text
logoFont + logoSize
        ↓
perfil vetorial do texto
        ↓
textWidth / textHeight ───────────┐
                                  ├─→ aba final
logoBaseWidthExtra ───────────────┘
        ↓
posição + tangente automática
        ↓
união booleana com a base do cortador
```

A UI mostra uma prévia tipográfica e também as dimensões calculadas da base e do texto, para que a proporção possa ser ajustada visualmente sem acoplar largura da aba ao tamanho da fonte.


## 14.28.18 — Rotação manual e correção fina da logo

A orientação da logo passa a ser um parâmetro explícito e independente da posição ao longo da borda. O cálculo continua obtendo a tangente local da borda, mas `resolveLogoOrientation()` decide o ângulo final conforme três modos:

- `auto`: usa somente a tangente local.
- `autoOffset`: soma `logoRotationOffset` à tangente local. A correção fina é limitada a ±45°.
- `manual`: ignora a tangente para a orientação visual e usa `logoRotationAbsolute` no sistema XY global do objeto.

O padrão é `autoOffset` com correção 0°, portanto projetos antigos continuam com o mesmo resultado geométrico. O modo manual em 0° mantém a marca horizontal em relação aos eixos globais do objeto, mesmo quando a borda local está inclinada.

A posição da aba continua derivada da normal externa da borda. A rotação final afeta o texto e a placa da logo; o conector estrutural é calculado separadamente na direção da normal externa, mantendo sobreposição robusta entre a placa rotacionada e a base do cortador.

```text
borda real
   ↓
tangente automática ──────────┐
                              ├─ auto → final
logoRotationOffset ───────────┤
                              ├─ autoOffset → tangente + correção
logoRotationAbsolute ─────────┘
                                 manual → ângulo global
                                      ↓
                         base + texto rotacionados
                                      ↓
                    conector radial independente
                                      ↓
                         união booleana manifold
```

Os três novos parâmetros entram no grafo paramétrico do nó `cutter`, portanto trocar o modo ou o ângulo invalida somente a parte necessária do cortador e não altera o carimbo separado.


## 14.28.19 — Cotas completas no Sketch

A ferramenta **Cota (D)** passa do modelo de cota imediata de uma única entidade para o fluxo CAD observado na referência Onshape:

1. selecionar uma entidade ou as referências;
2. mover o cursor;
3. clicar no espaço vazio para posicionar a cota;
4. digitar o valor;
5. clicar posteriormente no texto da cota para editar sem reenquadrar a câmera.

Tipos persistentes suportados no documento paramétrico:

- `lineLength`;
- `circleRadius` / `arcRadius`;
- `circleDiameter` / `arcDiameter`;
- `pointDistance`;
- `horizontalDistance`;
- `verticalDistance`;
- `angleBetweenLines`.

Cotas com duas referências participam do grafo incremental do solver e do diagnóstico de graus de liberdade. `dimensionEntityIds()` centraliza a descoberta das entidades afetadas para remoção, seleção, propagação incremental e diagnóstico.

A posição visual da anotação é persistida em `dimension.position`. O editor desenha linhas auxiliares e o texto da cota no próprio SVG. O clique no texto usa o id da cota, não apenas o id da entidade, permitindo múltiplos tipos de dimensão sem ambiguidade. Cotas angulares mantêm unidade em graus; as demais usam milímetros.

A escolha inteligente entre distância direta, horizontal e vertical usa a posição onde o usuário coloca a anotação. Diâmetro é a opção radial usada pelo fluxo de canvas; raio continua compatível no documento e no inspector legado.

A edição de cota altera somente a geometria/solver e não chama `fit()`, preservando o zoom, pan e enquadramento do Sketch durante a edição.
