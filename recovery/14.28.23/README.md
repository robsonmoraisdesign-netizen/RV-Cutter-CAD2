# RV Cutter CAD 14.28.23 — Sketch e logo

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
