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
