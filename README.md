# 📜 APIZapSign — Assinador Digital Web

> Aplicação web para assinatura digital de documentos utilizando a **API da ZapSign**.  
> Este projeto visa integrar todos os serviços da ZapSign a um backend próprio e disponibilizar um frontend intuitivo para gerenciar assinaturas de forma prática e segura.

---

## 📂 Estrutura do Projeto

```bash
APIZAPSIGN
├── backend                # Servidor Node.js/Express
│   ├── Config              # Configuração de banco e conexões
│   │   └── database.js
│   ├── Controller          # Lógica das rotas (controllers)
│   │   ├── apiController.js
│   │   └── userController.js
│   ├── Models              # Models do banco de dados
│   │   └── userModels.js
│   ├── Routes              # Rotas da API
│   │   └── apiRoutes.js
│   ├── api.js              # Ponto de entrada do servidor
│   ├── teste.js
│   ├── teste2.js
│   ├── teste3.js
│   └── ...                 # Arquivos de teste e utilitários
│
├── frontend               # Aplicação React (Vite + TypeScript)
│   ├── public
│   └── src
│       ├── assets
│       ├── pages
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── App.css
│       └── ...
│
├── README.md
└── .gitignore
```
## 📅 Status do Desenvolvimento

Atualmente, o projeto está na **1ª etapa** do desenvolvimento:

- ✅ **Etapa 1:** Integração de todas as rotas da API ZapSign no servidor backend.  
- ⬜ **Etapa 2:** Testar todas as rotas do servidor integradas à API ZapSign.  
- ⬜ **Etapa 3:** Planejar a estrutura do banco e criar os models (tabelas).  
- ⬜ **Etapa 4:** Montar controllers e rotas restantes, vinculando com serviços da API ZapSign.  
- ⬜ **Etapa 5:** Testar o backend completo e realizar ajustes finais.  
- ⬜ **Etapa 6:** Desenvolver o frontend e integrar com o backend.

## ⚙️ Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **API ZapSign**
- (Futuro) **Sequelize** ou **Prisma** + **PostgreSQL/MySQL**

### Frontend
- **React** (Vite + TypeScript)

## 🚀 Como Rodar o Projeto (versão atual)

Nesta fase inicial, apenas o backend está funcional. Para testar as integrações já concluídas:

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Acesse a pasta do backend
cd backend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
node api.js
```
