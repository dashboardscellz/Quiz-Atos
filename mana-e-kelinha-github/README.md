# 💕 Mana e Kelinha

Sistema de estudos gamificado para casais. Acompanhe seu progresso, desbloqueie conquistas e compita de forma saudável com seu parceiro(a)!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Funcionalidades

- 📝 **Registro de Sessões** - Registre cada sessão de estudo com matéria, tempo e questões
- ⏱️ **Cronômetro Integrado** - Controle seu tempo de estudo com timer embutido
- 🏆 **Sistema de Badges** - 50+ conquistas para desbloquear
- 📊 **Níveis e XP** - Sistema de progressão com 15 níveis
- 🔥 **Streaks** - Mantenha sequências de dias estudando
- 🏅 **Desafios** - Competição amigável entre o casal
- 🤖 **Plano de Estudos IA** - Recomendações personalizadas
- 🟢 **Status Online** - Veja quando seu parceiro está online
- 📱 **Responsivo** - Funciona em mobile e desktop

## 🚀 Como usar

### Acesso Online (GitHub Pages)

Acesse diretamente pelo GitHub Pages: `https://seuusuario.github.io/mana-e-kelinha`

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seuusuario/mana-e-kelinha.git
cd mana-e-kelinha
```

2. Abra o arquivo `index.html` em seu navegador:
```bash
# Linux/Mac
open index.html

# Windows
start index.html
```

Ou use um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

## 🔐 Credenciais

| Usuário | Senha |
|---------|-------|
| Mana | `estudo123` |
| Kelinha | `estudo123` |

## 📁 Estrutura do Projeto

```
mana-e-kelinha/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   ├── data.js         # Dados e configurações
│   ├── utils.js        # Funções utilitárias
│   ├── components.js   # Componentes React
│   └── app.js          # Aplicação principal
├── assets/             # Imagens e recursos
└── README.md           # Este arquivo
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **CSS3** - Estilos com Glassmorphism
- **LocalStorage** - Persistência de dados
- **GitHub Pages** - Hospedagem

## 📊 Sistema de XP

| Ação | XP Ganho |
|------|----------|
| 1 hora de estudo | +50 XP |
| Questão resolvida | +2 XP |
| Questão certa | +5 XP (bônus) |
| Dia de streak | +10 XP × streak |
| Badge desbloqueado | Variável |
| Nova matéria | +25 XP |

## 🏆 Sistema de Níveis

| Nível | Nome | XP Necessário |
|-------|------|---------------|
| 1 | Estudante Curioso | 0 |
| 5 | Estudante Avançado | 3.500 |
| 10 | Lenda Acadêmica | 14.500 |
| 15 | Entidade do Saber | 40.000+ |

## 📅 Data da Prova

A prova está marcada para **09 de Novembro de 2026**.

O sistema mostra automaticamente quantos dias faltam!

## 🎨 Cores do Tema

- **Mana (OAB)**: Roxo `#8b5cf6`
- **Kelinha (ENEM)**: Rosa `#ec4899`

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 💝 Feito com amor

Para Mana e Kelinha estudarem juntos e alcançarem seus objetivos! 📚💕

---

**Nota**: Os dados são armazenados localmente no navegador (LocalStorage). Para backup, exporte seus dados regularmente.
