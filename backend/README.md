✅ Passo a passo de instalação – Projeto meAdota-BackEnd
🧱 1. Iniciar o projeto

npm init

🚀 2. Instalar dependências principais

npm install express
npm install cors
npm install http

⚙️ 3. Instalar dependências de desenvolvimento (DevDependencies)

npm install ts-node-dev --save-dev
npm install typescript tsx @types/node --save-dev
npm install prisma --save-dev
npm install @types/cors --save-dev
npm install @types/express --save-dev

🧠 4. Iniciar configuração TypeScript
npx tsc --init

🗃️ 5. Inicializar o Prisma com SQLite

npx prisma init --datasource-provider sqlite --output ../generated/prisma
Isso criará a pasta prisma/ com o arquivo schema.prisma

🛠️ 6. Criar e aplicar a migração do banco de dados

npx prisma migrate dev --name init

⚒️ 7. Gerar o cliente Prisma

npx prisma generate

🧩 8. Instalar o cliente Prisma

npm install @prisma/client
✅ Sugestão de script dev no package.json
Adicione isso dentro de "scripts" no package.json:

json
Copiar
Editar
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "start": "node dist/index.js"
}
