# FIREBASE — CONFIGURAÇÃO FINAL DO ATOS

O projeto Firebase existente `quiz-atos` será reaproveitado integralmente para o novo sistema financeiro.

Você NÃO precisa criar outro projeto.

## 1. Opcional: trocar o nome visível do projeto

No Firebase:

**⚙️ Configurações do projeto → Geral → Nome do projeto**

Você pode trocar:

`Quiz Atos`

por:

`ATOS Financeiro`

O `projectId` continuará `quiz-atos`. Isso é normal e não precisa ser alterado.

## 2. Apagar os dados antigos do quiz

Se você realmente não usará mais nenhum dado antigo:

**Realtime Database → Data**

Exclua os nós antigos do quiz.

Faça isso somente se tiver certeza de que não precisa mais deles.

## 3. Substituir as regras

Entre em:

**Realtime Database → Rules**

Apague as regras antigas e cole exatamente o conteúdo do arquivo:

`database.rules.json`

Depois clique em **Publish**.

## 4. Pronto

O site já está configurado com o Firebase que você forneceu.

As movimentações serão gravadas diretamente em:

```text
movimentacoes
├── registro-1
├── registro-2
└── ...
```

Não precisa configurar Firebase Authentication.
Os dois logins administrativos já estão no site.
