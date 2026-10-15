# Borda personalizada de corte

Na função Cortador de biscoito, abra **Borda personalizada** e ative o padrão.
O padrão se distribui circularmente ao redor da origem do Sketch; não acompanha
contornos arbitrários. A arte continua sendo a fonte do relevo. A lâmina e a base
do carimbo recebem a borda calculada, com as folgas e offsets já existentes.

## Controles

- Quantidade: 4–120 curvas; o sentido alternado exige um número par.
- Diâmetro entre junções: diâmetro do círculo dos encontros entre curvas, em mm.
  Zero calcula um círculo que envolve todos os pontos da arte com a margem indicada.
  Não é o diâmetro externo final: curvas externas, parede e apoio aumentam a peça.
- Raio circular: zero usa o menor raio seguro; valores maiores deixam o arco mais raso.
- Perfil: arco circular exato, elíptico radial ou onda cossenoidal.
- Profundidade: amplitude radial para elíptico/onda; no circular deriva do raio.
- Sentido: para fora, para dentro ou alternado; rotação em graus.

A proteção de cantos não atua enquanto a borda está ativa, para não eliminar as
reentrâncias. A folga e a espessura ainda arredondam os encontros por offset físico.
O padrão e seus parâmetros são preservados em projetos, presets e desfazer/refazer
pelo fluxo existente. Desativar restaura o comportamento anterior sem alterar o Sketch.
O SVG exportado pelo comando de Sketch continua representando a arte; o STL contém
a geometria da lâmina personalizada.


## Atualização dos controles e reconstrução 3D

A caixa numérica aplica a alteração quando confirmada (Enter ou saída do campo).
O controle deslizante aplica ao soltar ou alterar seu valor. Para aplicar várias
medidas digitadas juntas, clique em **Aplicar parâmetros e atualizar 3D**.
A ação valida o conjunto de parâmetros antes de gravá-lo na Feature do cortador,
reconstrói o 3D e atualiza a persistência e o histórico do projeto.
Se um valor estiver fora dos limites, a edição inválida não substitui a
configuração anterior. Se a operação geométrica falhar, a última malha válida
continua visível, com o erro exibido no painel de validação.

A implementação definitiva reside em `src/ui.mjs`,
`src/procedural-border.mjs`, `src/geometry.mjs` e no grafo de dependências:
o executável deve ser compilado a partir do mesmo commit, não receber um
script de sobreposição separado após o empacotamento. O cache de malhas tem
versão própria para descartar resultados incompatíveis.

## Geometria

Para N curvas, α = π/N; R é metade do diâmetro entre junções.
A meia corda é h = R sen(α), e a linha da corda fica em b = R cos(α).
Um arco circular de raio r usa x = b ± (r cos(t) − √(r²−h²)),
y = r sen(t), com t entre −asin(h/r) e +asin(h/r).
Cada arco é girado por 2πi/N mais a rotação escolhida. O raio mínimo externo é h;
quando há arcos internos, h/cos(α) evita cruzamentos entre curvas vizinhas.

O perfil elíptico é definido no espaço angular/radial por θ = α sen(t),
ρ = R ± profundidade cos(t), para −π/2 ≤ t ≤ π/2. Não é uma elipse cartesiana.
A onda usa θ = α(2u−1) e ρ = R ± profundidade(1−cos(2πu))/2.
A amostragem converte esses perfis em contornos para o Manifold existente.

`src/procedural-border.mjs` não depende de DOM ou WASM. `geometry.mjs` aplica o
contorno em milímetros; `dependencies.mjs` invalida as peças afetadas. O motor 3D,
o documento semântico de Sketch e os controles de altura/chanfro são preservados.

## Validação

`node qa-procedural-border.mjs`: 36 combinações de perfil/contagem/sentido,
36 combinações de perfil/sentido/modo de fabricação, contorno único, ordem angular,
malhas fechadas, STL, chanfro, cache, valores inválidos e igualdade com o comportamento
legado quando desativado. `qa-browser-cdp.cjs` também verifica ativação e edição pelo
DOM, geração 3D e serialização dos parâmetros na Feature.

Referência analisada: PADRÃO DE LAMINA DE CORTE.svg e três STLs Delícias da Rô.
Os STLs medem aproximadamente 92 × 91,98 × 12,5 mm (cortador),
81 × 80,98 × 1,5 mm (base) e 80 × 79,98 × 1,5 mm (relevo).
Essas medidas servem como referência; não são impostas aos projetos do usuário.
