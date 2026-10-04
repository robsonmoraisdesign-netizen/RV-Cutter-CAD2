# RV Cutter CAD 14.28.10 — recuperação de Worker e geometria complexa

## Problema corrigido
Em cenas com poucos objetos, uma arte geometricamente mais complexa podia prender o Worker do Manifold durante uma reconstrução. Como o RV usava um único Worker para a fila geométrica, depois disso novas tentativas no mesmo objeto — inclusive individuais — ficavam presas atrás da operação anterior.

## Recuperação automática
- cada requisição geométrica agora possui watchdog;
- se uma construção exceder o limite seguro, o Worker preso é encerrado;
- as Promises pendentes são liberadas em vez de ficarem presas indefinidamente;
- o objeto que disparou o problema recebe uma nova tentativa em Worker limpo;
- a segunda tentativa usa perfil de recuperação com custo geométrico controlado;
- a geometria válida anterior continua visível enquanto a reconstrução é recuperada;
- outros objetos deixam de ficar permanentemente bloqueados por uma única peça.

## Complexidade adaptativa
- artes com muitos pontos/contornos entram automaticamente em perfil seguro;
- offsets arredondados usam resolução adaptativa somente quando a complexidade exige;
- o chanfro deixa de criar até 160 perfis intermediários e passa a usar limites controlados;
- perfil normal mantém até 64 perfis, seguro até 24 e recuperação até 12;
- a mudança preserva os parâmetros físicos do usuário; o que muda é apenas a discretização intermediária usada para chegar à mesma forma.

## Cache e compatibilidade
- ENGINE_VERSION atualizado para 14.28.10, invalidando resultados geométricos antigos;
- presets v2, edição em lote, Mostrar todos, importação múltipla e correções visuais das versões anteriores permanecem preservados.

## Regressão
- a suíte existente de chanfro continua sendo usada para verificar erro máximo de largura e malha fechada;
- o contrato v4 agora exige watchdog, recuperação do Worker e limitação adaptativa de complexidade.
