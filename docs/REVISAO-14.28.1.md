# Revisão 14.28.1

Base: develop c028bb3 (14.28.0). Preserva a interface V4 e a arquitetura Sketch → funções → corpos.

## Correções

- Presets atualizam os parâmetros persistidos da função Cortador, evitando que a reconstrução restaure valores antigos.
- Desfazer/refazer restaura o contexto do Sketch e sinaliza alterações pendentes.
- Selecionar outro Sketch durante edição troca também o contexto ativo; excluir o Sketch em edição encerra esse contexto.
- Importar encerra o editor anterior, remove o estado visual antigo e registra recuperação automática.
- A árvore atualiza medidas e estado ao terminar a geração 3D.
- Contornos importados podem ser selecionados por proximidade (8 pixels), com realce ao passar o mouse. Alças explícitas têm prioridade sobre entidades próximas.
- Movimento do mouse sem mudança de alvo não reconstrói o SVG. Diagnósticos de entidades reutilizam resultados enquanto documento e solução permanecem iguais.

## Validação

O teste CDP cobre criação por mouse, cotas, undo/redo, preset, STL binário, troca de Sketch, importação, seleção a 6 pixels, persistência e fechamento de projeto. Verifica pixels e chamadas de desenho em Modelo e Apresentação. Erros de avaliação JavaScript agora interrompem o teste, em vez de serem ignorados.

A CI existente executa a suíte geométrica e testa Electron no Windows, tanto do código quanto do executável empacotado, incluindo gravação nativa de STL.

## Escopo

Esta é uma revisão de integração e interação. Não substitui o kernel, não implementa equivalência completa com Onshape e não comprova desempenho para qualquer tamanho de projeto. Desfazer ainda restaura um snapshot e pode reconstruir funções. Os testes visuais automatizados cobrem um modelo simples; não substituem inspeção de todos os projetos e estilos do usuário.
