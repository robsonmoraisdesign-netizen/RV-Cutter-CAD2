# RV Cutter CAD 14.28.2 — Relevo separado da base

Na seção **Relevo** foi adicionada a caixa **Separar relevo da base**.

Quando marcada nos modos **Cortador + carimbo** ou **Só carimbo**, o resultado 3D mantém **Base do carimbo** e **Relevo** como peças independentes, preservando a mesma origem de montagem.

Ao abrir Exportar, o RV seleciona automaticamente **Um STL por peça**, gerando arquivos independentes.

No relevo normal, o relevo começa exatamente no topo da base. No relevo invertido, a base estrutural continua intacta e o objeto Relevo é a camada gravável acima da base, já com o desenho subtraído.

A opção é desligada por padrão; projetos antigos continuam compatíveis e o modo integrado permanece inalterado.
