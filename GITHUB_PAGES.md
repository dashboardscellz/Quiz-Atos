# PUBLICAR NO GITHUB PAGES

Como você vai reutilizar um repositório antigo:

1. Abra o repositório no GitHub.
2. Faça backup do conteúdo antigo se quiser.
3. Apague os arquivos antigos.
4. Envie TODO o conteúdo deste pacote para a raiz do repositório.
5. Vá em:
   **Settings → Pages**
6. Em **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
7. Salve.

O GitHub publicará o novo site ATOS.

O arquivo `firebase-config.js` já está configurado com o projeto Firebase `quiz-atos`.
