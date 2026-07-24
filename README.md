# meAdota

Monorepo do projeto meAdota — plataforma de adoção de animais domésticos.

## Estrutura

```
meAdota/
├── backend/     API / servidor (Node.js + Express + Prisma)
├── mobile/      App mobile (Expo / React Native)
├── web/         Frontend web (Next.js)
└── web-vite/    Frontend alternativo (Vite + React)
```

Cada pasta é um projeto independente, com o seu próprio `package.json` e histórico de commits preservado a partir dos repositórios originais (`meAdota-BackEnd`, `meAdota-Expo`, `meAdota-Next`, `meAdota-Vite`).

## Como correr cada serviço

### Backend

```bash
cd backend
npm install
cp .env.example .env   # preencher DATABASE_URL
npx prisma generate
npm run dev
```

### Mobile (Expo)

```bash
cd mobile
npm install
npx expo start
```

### Web (Next.js)

```bash
cd web
npm install
npm run dev
```

### Web Vite

```bash
cd web-vite
npm install
npm run dev
```

## Variáveis de ambiente

Cada serviço tem o seu próprio `.env`, que nunca deve ser commitado. Onde existir `.env.example`, use-o como referência para as chaves necessárias.
