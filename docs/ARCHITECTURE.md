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
              Line / Circle / Arc / Bezier
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

