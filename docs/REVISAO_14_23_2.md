# Revisão 14.23.2 — Sketch integrado

Base: `feature/sketch-parametric`, commit b0b3935a6dc608e4c9ea6bca1e21a3043d030b6b. Continuação da issue #2. O motor de fabricação e seu cache permanecem na versão 14.22.0; versão do aplicativo é 14.23.2. Não confundir versão da interface com chave de compatibilidade geométrica.

## Entregue

- Linha CAD, círculo, retângulo com quatro entidades relacionadas e arco de três pontos, no editor SVG existente.
- Seleção e alças, restrições horizontal/vertical/coincidente/fixar, comprimento de linha e raio, remoção de entidade e de restrição.
- Documento nativo serializado em cada objeto, IDs persistentes, snapshot de fixação, referências validadas e transações que rejeitam conflitos.
- Estado livre/parcial/definido por análise local; componentes muito grandes não recebem diagnóstico exato de graus de liberdade.
- Novo projeto abre Sketch vazio. Perfis fechados alimentam o motor existente; linhas abertas continuam editáveis, sem sólido próprio.
- Mudanças nas regras que não alteram o perfil não invalidam o sólido. O solver atualiza o componente conectado às entidades editadas; geração continua por objeto e por dependências do motor existente.
- Conversão explícita em contornos mantém acesso às ferramentas legadas de borracha, offset e espessura. Depois da conversão, essas entidades deixam de ser paramétricas; Desfazer restaura o documento.
- Indicador de salvamento, nomes mais claros para dimensão da peça, botão de inversão do relevo restaurado, versão derivada de package.json no build.
- Empacotamento Windows x64 com runtime Electron bloqueado no package-lock e conferência PE/x64. Distribuição é pasta completa, não EXE isolado.

## Validação executada em Linux

`npm run build` e `npm test`: PASS, incluindo geometria, chanfro, cantos, expansão vinculada, exportação, volume do relevo invertido, catálogo e Sketch.

`qa-sketch-browser.cjs`: PASS em Chromium, desenho por mouse, cota, geração do sólido, serialização/reabertura e troca para apresentação, sem erros de JavaScript.

`qa1417-session.cjs`: PASS. Relevo alterado reutiliza cortador e geometria GPU; 12 reaberturas mantêm 11 geometrias e 6 texturas na GPU. Heap observado de aproximadamente 5,6 a 6,5 MB (não representa todo o consumo do processo). Em projeto de 24 objetos, editar um preserva os outros 23 resultados. Isolar reduz malhas ativas de aproximadamente 3,06 MB a 0,11 MB. Trocar projeto cancela o worker anterior. São cenários limitados, não uma garantia de ausência de vazamento em qualquer projeto.

O CI executa a suíte também em Windows e gera o portable. A validação interativa do EXE no computador do usuário não foi realizada neste ambiente.

## Limites e próximos incrementos

Esta revisão NÃO conclui todos os 183 itens do checklist histórico. Marcações do checklist que não têm implementação/teste no Git não foram tomadas como evidência.

Ainda pendentes: texto paramétrico, splines, solver CAD geral, restrições avançadas, seleção de múltiplas faces/arestas e revisão visual completa de todos os estilos de apresentação. O solver da fase 1 é de projeções e pode rejeitar sistemas que exigem solução mais geral. Edição vetorial legada sobre contornos derivados exige conversão explícita. Manter as duas representações editáveis simultaneamente exigirá mapeamento de proveniência adicional.

## Uso

Novo projeto → Linha CAD / Retângulo / Círculo / Arco 3 pontos. Retângulo e círculo são desenhados arrastando; arco usa três cliques. Em Selecionar, clique na entidade ou arraste suas alças. Abra Restrições e cotas para aplicar comprimento/raio ou restrições. Shift + clique permite selecionar dois pontos para Coincidente. Modelos antigos continuam no fluxo de contornos existente.
