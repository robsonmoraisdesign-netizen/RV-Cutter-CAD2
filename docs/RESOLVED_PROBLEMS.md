# Problemas resolvidos — registro anti-regressão

Este arquivo é permanente. Um problema corrigido não deve ser apagado; deve ganhar teste de regressão.

| ID | Problema | Regra permanente |
|---|---|---|
| R-001 | Alterações feitas apenas no executável/portable | Toda mudança nasce no código-fonte versionado e o build é derivado dele. |
| R-002 | Regressão arquitetônica por camada Sketch paralela | Sketch deve integrar módulos existentes e um domínio próprio, nunca overlay paralelo. |
| R-003 | Função de tamanho confundida com ausência de motor | O 14.22 já possui `size` e dimensões; reorganizar como “Dimensões da peça” sem duplicar o motor. |
| R-004 | Relevo invertido perdendo liberdade paramétrica | Inversão deve manter os mesmos parâmetros editáveis do relevo normal. |
| R-005 | Profundidade do relevo aplicada para baixo/cortando base | Profundidade nasce da base para cima. |
| R-006 | Projeto anterior continuando processado ao voltar à biblioteca | Troca/fechamento deve encerrar jobs e liberar recursos do projeto anterior. |
| R-007 | Recalcular tudo após qualquer alteração | Usar grafo de dependências, dirty/clean, cache e jobs contextuais. |
| R-008 | Ocultar item recentralizando/reorganizando cena | Visibilidade não deve alterar câmera/layout. |
| R-009 | Versões divergentes entre fonte/runtime/documentação | Versão de aplicação deve derivar de fonte única no processo de release. |
| R-010 | QA obsoleto permanecendo como falha silenciosa | Teste stale deve ser atualizado/removido e registrado. |
| R-011 | Entrega declarada validada sem execução real | Só marcar PASS para teste realmente executado; limitações devem ficar explícitas. |
| R-012 | Função visual presente, mas sem modelo arquitetônico real | Botão/UI não conta como função concluída sem estado, persistência, comportamento e teste. |
| R-013 | ZIP de staging enviado com sufixo `(1)` não acionou o importador que esperava nome exato | Arquivo de staging deve ser normalizado antes da importação; automações não podem depender de um nome de upload frágil. |
| R-014 | Verificação SHA da baseline falhou apenas no Windows por conversão LF→CRLF no checkout | `.gitattributes` deve fixar `eol=lf` para texto e marcar binários explicitamente antes de comparar hashes. |
| R-015 | Núcleo de Sketch sem ligação com interface e persistência | O editor SVG existente usa o controlador de domínio; entidades, restrições e cotas sobrevivem à serialização. QA: `qa-sketch-integration.mjs`, `qa-sketch-browser.cjs`. |
| R-016 | IDs sequenciais colidindo após reabrir um Sketch | IDs persistentes únicos, validação de referências e rejeição de duplicatas antes de resolver. |
| R-017 | Fixar recapturando coordenadas alteradas | A restrição guarda sua geometria de referência; conflitos rejeitam a transação sem alterar o objeto. |
| R-018 | Novo projeto obrigando importação antes de desenhar | Novo projeto abre objeto vazio no Sketch; apenas perfis fechados entram na fabricação. |
| R-019 | Contagem antiga de 60 projetos no QA após migração paginada | QA atualizado para os 140 projetos reais do cenário, preservando paginação e carregamento preguiçoso. |
| R-020 | Sketch paramétrico funcional, mas interface continuava como barra antiga cheia de botões | O Sketch usa ribbon contextual `Criar / Modificar / Restringir / Cota`, inspector próprio, cotas/restrições no canvas e QA de contrato visual. |
| R-021 | Autosave silencioso no catálogo tornava a opção “Não salvar” sem efeito real | Edição grava apenas recuperação de falha; o catálogo é atualizado por salvamento explícito ou por “Salvar” na transição. |
| R-022 | Troca para Biblioteca/novo projeto podia manter jobs/worker/cena do anterior até a substituição | Toda transição passa por `Salvar / Não salvar / Cancelar`; ao continuar, `resetSession()` encerra worker, pendências, geração e cena antes do próximo projeto. |
| R-023 | Inferência visual de snap não criava relação paramétrica persistente | Snap em extremidades/centros cria restrição Coincidente sem converter entidades em pontos soltos. QA: `qa-sketch-snapping.mjs`. |
