# Mestria

Projeto de estudo pessoal — plataforma de aprendizado com controle de acesso por papéis (RBAC), autenticação SPA com cookies e API REST.

## Stack

**Backend**
- PHP 8.3 + Laravel 13
- Laravel Sanctum 4 — autenticação SPA stateful com cookies
- MySQL
- Sessão armazenada em banco de dados

**Frontend**
- React 19 + Vite 8
- Tailwind CSS 4

## Funcionalidades implementadas

**Autenticação**
- Registro com verificação de email obrigatória
- Login com "lembrar sessão"
- Logout com invalidação de sessão e remoção do cookie
- Recuperação e redefinição de senha
- Rate limiting por email e por IP

**Banco de dados**
- Usuários, papéis, perfis de instrutor
- Cursos, módulos, aulas
- Quizzes, questões, respostas
- Matrículas, favoritos, progresso por aula, certificados

## Arquitetura de autenticação

O sistema usa o fluxo SPA stateful do Sanctum — sem tokens JWT, autenticação baseada em cookies HttpOnly gerenciados pelo browser.

```
1. React obtém o CSRF cookie em /sanctum/csrf-cookie
2. Axios envia o token XSRF-TOKEN no header X-XSRF-TOKEN
3. Laravel valida o CSRF e autentica via sessão
4. Cookies HttpOnly mantêm a sessão entre requisições
5. Logout invalida a sessão no servidor e remove o cookie
```

## Estrutura do projeto

gestao-cursos/
├── backend/                         # Laravel 13
│   ├── app/
│   │   ├── Actions/
│   │   │   ├── DeleteUserAccountAction.php
│   │   │   └── UpdatePasswordAction.php
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Auth/AuthController.php
│   │   │   │   └── Auth/PasswordResetController.php
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Providers/
│   │   │   ├── AppServiceProvider.php
│   │   │   └── RateLimiterServiceProvider.php
│   │   └── Services/
│   │       └── AuthService.php
│   ├── config/
│   └── routes/api.php
└── frontend/                        # React 19
    └── src/
        ├── components/
        │   ├── layouts/AuthLayout.jsx
│       │   ├── pages/
│       │   │   ├── LoginPage.jsx
│       │   │   ├── RegisterPage.jsx
│       │   │   ├── VerifyEmailPage.jsx
│       │   │   ├── VerifyEmailSuccesPage.jsx
│       │   │   └── DashboardPage.jsx
│       │   └── ui/
│       ├── contexts/AuthContext.jsx
│       └── services/api.js

## Como rodar localmente

**Pré-requisitos:** PHP 8.3, Composer, Node 18+, MySQL

**Backend**

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

**Frontend**

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Acesse `http://localhost:5173`.

O backend sobe em `http://localhost:8000` por padrão. Confirme que `VITE_API_URL` no `frontend/.env` aponta para essa URL.

## Variáveis de ambiente

**backend/.env** — principais

| Variável | Descrição |
|---|---|
| `APP_KEY` | Gerada com `php artisan key:generate` |
| `FRONTEND_URL` | URL do frontend (usada no CORS) |
| `SANCTUM_STATEFUL_DOMAINS` | Domínios autorizados a usar sessão stateful |
| `SESSION_DOMAIN` | Domínio dos cookies de sessão |
| `DB_*` | Configurações do banco MySQL |

**frontend/.env**

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API Laravel |

## Rotas da API

**Públicas**

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Registro de usuário |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/email/verify/{id}/{hash}` | Verificação de email |
| POST | `/api/auth/forgot-password` | Solicitar redefinição de senha |
| POST | `/api/auth/reset-password` | Redefinir senha |

**Autenticadas** (`auth:sanctum`)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/logout` | Logout |
| POST | `/api/email/resend` | Reenviar verificação |
| GET | `/api/user` | Usuário autenticado |
| PUT | `/api/password` | Alterar senha |
| DELETE | `/account/` | Excluir conta |


## Status do projeto

Projeto em desenvolvimento. Funcionalidade de autenticação implementada.

## 📬 Procurando uma Desenvolvedora?

Se você procura uma **Desenvolvedora** para criar seu MVP, ferramenta interna ou plataforma web, vamos conversar.

<div align="center">

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/talita-vie)
  &nbsp; &nbsp;
  [![Email](https://img.shields.io/badge/Email-Entrar_em_Contato-red?style=for-the-badge&logo=gmail)](mailto:talitavieira.dsg@gmail.com)

</div>