# RV Cutter CAD 14.28.25 — Sketch e logo com alinhamento global

Base efetiva: pacote Windows 14.28.22. As alterações 14.28.20–22 não estavam nas branches disponíveis do Git. Para preservar a extensão integral da logo, esta pasta recupera o JavaScript distribuído, formata-o como fonte legível e aplica as correções antes de gerar os bundles. Sem segundo editor ou overlay. Os módulos da raiz permanecem para reconciliação futura; a origem deste pacote é esta pasta.

Construção: nesta pasta, npm install e npm run build. Em Windows x64, npm start. app/manifold.wasm é copiado do pacote manifold-3d instalado. O runtime é Electron 41.0.0 Windows x64.

## Problemas resolvidos
- Delete/Backspace apaga o contorno importado selecionado, inclusive a silhueta externa e o último contorno. Pontos selecionados continuam tendo exclusão individual.
- O botão Apagar usa a mesma operação. Ctrl+Z e Refazer restauram as alterações.
- Contornos importados permanecem selecionáveis em Sketch misto; removê-los preserva entidades paramétricas independentes.
- Clicar no canvas muda o foco; Delete em campos editáveis e diálogos não apaga geometria.
- Base da logo dimensionada considerando a rotação relativa das letras. Valores manuais pequenos recebem apoio mínimo; o painel informa a medida real gerada.
- Rotação da base mantém o lado selecionado. Distância usa a projeção da base girada. Extensão continua com a largura integral, sem pescoço estreito.
- Contornos das fontes simplificados por erro geométrico de 0,01 mm em vez de descarte periódico de pontos.
- Altura do relevo da logo corrigida em 0,01 mm; sliders sincronizam parâmetros da função; controles de orientação inativos ficam desabilitados.
- Versão do cache geométrico atualizada para invalidar resultados anteriores.

## Validação
Testes CDP com clique e tecla físicos: exclusão interna/externa, Sketch vazio/misto, entidade paramétrica, foco, botão, desfazer/refazer. Regressões de projetos, importação múltipla, presets, geração 3D, apresentação e STL. Logo testada com texto real, rotações 0/45/90°, distâncias 0/4/12 mm, base manual pequena, slider e campo numérico; malhas fechadas e um corpo nos casos testados.

Não se trata da conclusão do ambiente FreeCAD/Onshape. Fontes não instaladas podem usar equivalentes do sistema. Pacote PE Windows x64 conferido; execução nativa do EXE depende da validação Windows, separada dos testes Chromium/Linux.


## 14.28.24 — alinhamento global real da logo
- Presets globais: Horizontal 0°, 45°, Vertical 90° e −45°, além do ângulo manual livre.
- O preset global alinha texto, placa/base e o complemento que liga a placa ao cortador no mesmo sistema de eixos.
- Arrastar a logo pela borda altera somente a posição quando a orientação global/manual está ativa.
- O complemento não é mais uma varredura diagonal pela normal local da borda. Ele é um retângulo de largura total, alinhado a um dos eixos da própria base da logo e prolongado até dentro da base do cortador.
- Para logo horizontal, o complemento fica horizontal/vertical; para 45° ele gira junto em 45°; para 90° ele gira junto em 90°.
- A distância da base ao cortador é preenchida pelo complemento mantendo toda a largura correspondente da base, sem pescoço estreito ou laterais oblíquas.
- A normal da borda continua sendo usada apenas para escolher qual lado da base aponta para fora do cortador; ela não gira a base quando o modo global/manual está ativo.

### Critérios de QA 14.28.24
- 0°, 45°, 90° e −45°: texto e base devem ter exatamente o ângulo selecionado.
- O deslocamento da placa em relação ao ponto de ancoragem deve ocorrer por um eixo local da placa.
- O conector deve declarar `axisAlignedFullSpan` e preservar toda a largura útil da placa no eixo transversal.
- A malha final deve permanecer em um único corpo fechado e sem arestas não-manifold.


## 14.28.25 — revisão de edição e suporte da logo
- Arrastar vértices e mover contornos importados preserva o documento nativo, as entidades e restrições independentes. A prévia não altera o projeto a cada movimento; a confirmação ocorre ao soltar. Cancelamento do ponteiro descarta a prévia.
- Selecionar um vértice sem movê-lo não cria alterações. Edição e inserção de pontos disponíveis também em Sketch misto.
- Seleção por proximidade de contornos ampliada para 10 pixels; clique direto no contorno não é capturado por uma entidade próxima.
- Posicionamento da logo vincula os parâmetros à função do cortador antes da alteração e da restauração.
- Ligação entre complemento e placa da logo tem sobreposição de 0,05 mm para evitar união apenas por aresta. Presets globais da 14.28.24 preservados.
- Migração do afastamento antigo corrigida no worker; valores numéricos não finitos rejeitados antes da normalização.
- Cache geométrico atualizado para a nova versão.

### Validação desta revisão
Chromium/Linux: regressões de interface, projetos, importação múltipla, apresentação e STL; Delete e desfazer; seleção e arraste real de vértice em Sketch misto; preservação de entidades e confirmação única; rotações globais e independentes de texto/base; apoio de todos os pontos da logo e malhas fechadas com um corpo nos casos testados.
A execução nativa no Windows não foi validada neste ambiente. O runtime Windows x64 foi preservado do pacote 14.28.24.
