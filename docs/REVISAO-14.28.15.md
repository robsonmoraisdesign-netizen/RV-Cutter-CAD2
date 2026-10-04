# RV Cutter CAD 14.28.15 — revisão de geometria e apresentação

Base: 14.28.14, commit ae98c715365d44fd96b78122a4bde93aee4ef0a1. Aplicativo desktop Windows x64 portátil; não exige instalação do FreeCAD.

## Correções

- Espelhar arte ativado em novos objetos; projetos com escolha explícita mantêm seu valor.
- Auditoria de contraste mede o estilo original e mantém a correção estável. O observador ignora suas próprias correções e mutações SVG do Sketch, evitando auditorias repetidas durante desenho e seleção.
- Contraste do botão de ação no tema claro corrigido. Papéis visuais são reavaliados quando classes/contextos mudam, inclusive em elementos adicionados dinamicamente.
- Abrir projeto de outra versão preserva material PLA escolhido.
- Cor do reforço é aplicada à superfície real do sólido, sem uma segunda malha sobreposta. Removido código morto de overlay baseado em correspondência incorreta entre perímetros.
- Cache preserva contornos do reforço e do relevo invertido: cores e linhas não desaparecem após alterações que reutilizam geometria.
- Transição do reforço usa a altura da base como origem consistente. Bases mínimas não geram lâmina/relevo abaixo de Z=0.
- Modo somente carimbo não é bloqueado pela relação entre base e altura do cortador inativo.
- Versão do cache geométrico atualizada para não reutilizar resultados anteriores à correção.

## Validação

Novas regressões cobrem cache aquecido versus cálculo novo, malhas fechadas, áreas de superfície de renderização versus fabricação, reforço e relevo com cores corretas, espelhamento, bases finas e restrições persistentes de origem/eixo. Testes do navegador cobrem estabilidade da auditoria, material salvo, importação múltipla, seleção por proximidade, desfazer/refazer, presets e STL. O pipeline executa a suíte completa em Linux e Windows; o ZIP só é publicado após abrir o EXE empacotado e salvar um STL com reforço e chanfro via IPC nativo.

## Uso

Extraia todo o ZIP para uma pasta local e execute **RV Cutter CAD.exe** dentro dela. Não execute somente o EXE copiado para fora da pasta: ele depende dos arquivos que o acompanham. Salve uma cópia dos projetos antes de editar nesta versão.

## Limites

Esta revisão mantém o motor Manifold e o Sketch atual. Não é uma migração para FreeCAD nem equivalência completa com Onshape/Fusion. O teste automatizado não substitui inspeção do STL no fatiador nem validação de impressão para cada material/bico. Não há medição suficiente para prometer um percentual de aceleração ou ausência de falhas em qualquer projeto arbitrário.
