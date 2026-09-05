# ATOS — Transparência Financeira

Versão final preparada para reaproveitar integralmente o Firebase existente `quiz-atos`.

## Já configurado

- Firebase do projeto existente
- Realtime Database
- logo do ATOS
- painel público
- saldo em tempo real
- entradas e saídas
- justificativa/motivo
- gráficos
- projeção de 30 dias
- área ADM
- dois logins administrativos embutidos
- exportação CSV
- responsivo para celular

## Banco

Os registros ficam em:

`movimentacoes`

## Para colocar no ar

1. Se quiser, renomeie visualmente o projeto Firebase para `ATOS Financeiro`.
2. Se não precisar mais do quiz, apague os dados antigos do Realtime Database.
3. Publique `database.rules.json` em **Realtime Database → Rules**.
4. Envie os arquivos deste pacote ao GitHub Pages.

## Atenção sobre segurança

Esta versão usa login local no navegador para manter a instalação simples. A interface restringe edição aos dois logins, mas as regras de escrita do Realtime Database precisam aceitar gravações do site público. Portanto, isso não equivale a autenticação de servidor.
