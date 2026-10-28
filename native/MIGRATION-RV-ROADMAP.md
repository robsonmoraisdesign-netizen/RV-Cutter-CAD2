# RV Cutter → SolidCraft Rust: migração de fabricação

## Base do produto

- Motor geométrico: **SolidCraft B-rep + Sketch paramétrico em Rust**.
- Interface: **egui SolidCraft**. Manter o ribbon, browser, viewport,
  timeline e o sistema de aparência da base; não reconstruir em Electron.
- Regra de implementação: recursos de fabricação como operações nativas
  que conservam Sketch fonte, parâmetros, dependências, undo/redo e
  salvamento. Sem código JavaScript no motor desktop novo.
- Migrar progressivamente sem desligar a versão Electron antiga enquanto
  faltarem geradores e verificações de equivalência.

## Mapa das funções existentes

| Grupo RV anterior | Campos/funções existentes | Direção Rust |
|---|---|---|
| Sketch/importação | PNG/JPG/SVG, limiar, tamanho físico, aparar, estender, editar curvas, cotas | [em curso] traçado Rust, amostragem adaptativa, dimensão automática, solver SolidCraft |
| Cortador | largura máxima, expansão do contorno, espessura, altura, base, borda | [primeira entrega] Thin Extrude + base parametrizados; ainda faltam expansão controlada e robustez em desenhos complexos |
| Lâmina avançada | chanfro, ponta, altura do chanfro, cantos, reforço, perfil/borda procedural | [pendente] feições B-rep com offsets/sweep/loft e cotas associativas |
| Carimbo | base, expansão/recuo, folga, espessuras, desenho | [pendente] seleção de regiões e extrusões paramétricas, com opção peça separada |
| Relevo | positivo/negativo, relevo separado, detalhes, limites de parede | [pendente] features cut/join em face da base e validação topológica |
| Logotipo | texto, fontes, plaqueta, posição contínua da borda, deslocamento, rotação | [pendente] texto em Sketch, posicionamento e operações associativas |
| Rolos de textura | repetição de perfil ao longo da superfície | [pendente] padrões/emboss/surface com alternativas para curvas |
| Presets/bibliotecas | parâmetros editáveis, atualizar/renomear/salvar | [pendente] receitas declarativas versionadas, migração sem perda |
| Exportação | STL por peça e conjunto, persistência e reabertura | [parcial] exportação base SolidCraft; faltam equivalência e orientação por peça |
| Visualização | material, luz, contraste, modo escuro, apresentação | [parcial] reaproveitar UI/renderer SolidCraft; portar opções de fabricação |

## Etapa implementada nesta branch

1. Contornos raster grandes já não falham automaticamente aos 4 MP:
   decodificação com limite de segurança e reamostragem de traçado.
2. O tamanho físico (maior eixo em mm) pode receber cota dirigível
   automática em PNG/JPG; pode ser desativada quando o solver exigir edição.
3. Painel RV CORTADORES com parâmetros em milímetros para a lâmina e base.
4. Conversão nativa Sketch → duas extrusões finas com uma transação/undo.
5. Testes automatizados de traçado de imagem grande, cota e volume
   dependente de parâmetro.
6. Aba CORTADORES integrada ao ribbon nativo e seletor de Sketch de origem.
7. Extração experimental do maior contorno fechado de sketches poligonais XY,
   preservando o original; simplificação explícita antes do limite de 800 curvas.
8. Borda lisa, ondulada ou serrilhada, com quantidade e profundidade, em Rust.
   O resultado desta etapa é uma cópia editável, ainda não associativa.
9. Correção de folgas numéricas na união de segmentos da parede, limitada à
   tolerância existente de 0,00001 mm; contornos realmente abertos são recusados.

## Etapas seguintes (não implementadas)

- Persistir a definição procedural da borda como feature associativa, com
  atualização automática a partir da origem e dos parâmetros, undo e reabertura.
- Pré-tratamento de imagens: limiar automático por histograma/Otsu,
  remoção opcional de ruído, preservação de detalhes e ajuste de curvas.
- Ampliar a seleção de silhuetas: múltiplos componentes, união controlada e
  escolha por trechos; detalhes internos separados para carimbo.
- Bordas por arcos de raio exato/alternado, margem constante, chanfros,
  reforços e proteção de cantos. Ondas atuais são aproximações poligonais.
- Gerador de carimbo, relevo e logomarca associativos com plano de
  manutenção de equivalência ao antigo RV.
- Presets e biblioteca nativa; migração de histórico e parâmetros
  de projetos `rv-cad-13` antigos (hoje apenas contornos).
- Validação de impressão 3D: parede mínima, malha estanque,
  orientação, tolerâncias e exportação STL por componentes.

## Critérios de qualidade

- Novo recurso não pode corromper ou substituir o Sketch original.
- Alterar cota/expressão deve recomputar o corpo B-rep (teste de volume).
- Operação com falha reverte o documento e o histórico.
- O workflow Windows deve rodar testes antes de publicar o executável.
- Modelos com buracos, regiões aninhadas, curvas livres e imagens
  complexas precisam de testes próprios antes de declarar suporte geral.
