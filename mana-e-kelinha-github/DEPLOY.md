# 🚀 Guia de Deploy no GitHub Pages

## Opção 1: Upload Manual (Mais Fácil)

### Passo 1: Criar Repositório
1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `mana-e-kelinha`
3. Deixe como **Público**
4. Clique em **Create repository**

### Passo 2: Fazer Upload dos Arquivos
1. No seu repositório, clique em **"uploading an existing file"**
2. Arraste todos os arquivos da pasta `mana-e-kelinha-github` ou clique em "choose your files"
3. Em "Commit changes", escreva: `🎉 Primeiro commit`
4. Clique em **Commit changes**

### Passo 3: Ativar GitHub Pages
1. Vá em **Settings** (aba superior)
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione:
   - **Deploy from a branch**
   - Branch: `main` ou `master`
   - Folder: `/(root)`
4. Clique em **Save**

### Passo 4: Acessar seu site
- Aguarde 1-2 minutos
- Seu site estará em: `https://SEU-USUARIO.github.io/mana-e-kelinha`

---

## Opção 2: Usando Git (Linha de Comando)

### Requisitos
- Git instalado: [git-scm.com](https://git-scm.com)
- Conta no GitHub

### Comandos

```bash
# 1. Entre na pasta do projeto
cd mana-e-kelinha-github

# 2. Inicialize o git
git init

# 3. Adicione todos os arquivos
git add .

# 4. Faça o commit
git commit -m "🎉 Primeiro commit - Mana e Kelinha v1.0"

# 5. Adicione o repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/mana-e-kelinha.git

# 6. Envie para o GitHub
git push -u origin main
```

---

## Opção 3: GitHub Desktop (Interface Gráfica)

1. Baixe o [GitHub Desktop](https://desktop.github.com)
2. Clique em **File** → **Add local repository**
3. Selecione a pasta `mana-e-kelinha-github`
4. Escreva uma mensagem de commit e clique em **Commit to main**
5. Clique em **Publish repository**
6. Siga as instruções na tela

---

## ✅ Verificação

Após o deploy, verifique se:
- [ ] O site abre em `https://SEU-USUARIO.github.io/mana-e-kelinha`
- [ ] O login funciona com as credenciais
- [ ] O cronômetro funciona
- [ ] As sessões são salvas

## 🆘 Problemas Comuns

### "Page not found"
- Aguarde 2-3 minutos após ativar o GitHub Pages
- Verifique se a branch está correta (main/master)

### Arquivos não aparecem
- Certifique-se de que o `index.html` está na raiz
- Verifique se fez o commit corretamente

### CSS/JS não carrega
- Verifique os caminhos nos arquivos HTML
- Use caminhos relativos: `./css/styles.css`

---

## 🎉 Pronto!

Seu site estará online e funcionando! Compartilhe o link com seu parceiro(a) 💕
