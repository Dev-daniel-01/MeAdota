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


<!-- import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

export default {
    create: async (req: Request, res: Response) => {
        const pet = await prisma.pet.create({ data: req.body })
        return res.status(201).json(pet)
    },

    read: async (req: Request, res: Response) => {
        const pets = await prisma.pet.findMany({ select: { id: true, image: true, animal: true, name: true, description: true, race: true, age: true, size: true, cep: true } })
        return res.status(200).json(pets)
    },

    update: async (req: Request, res: Response) => {
        const id = req.params.id
        const pet = await prisma.pet.update({ data: req.body, where: { id: +id } })
        return res.status(200).json(pet)
    },

    delete: async (req: Request, res: Response) => {
        const id = req.params.id
        const pet = await prisma.pet.delete({ where: { id: +id } })
        return res.status(200).json(pet)
    },

} -->


<!-- import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

export default {
    create: async (req: Request, res: Response) => {
        const user = await prisma.user.create({ data: req.body })
        return res.status(201).json(user)
    },

    read: async (req: Request, res: Response) => {
        const users = await prisma.user.findMany({ select: { password: false, id: true, name: true, email: true } })
        return res.status(200).json(users)
    },

    update: async (req: Request, res: Response) => {
        const id = req.params.id
        const user = await prisma.user.update({ data: req.body, where: { id: +id } })
        return res.status(200).json(user)
    },

    delete: async (req: Request, res: Response) => {
        const id = req.params.id
        const user = await prisma.user.delete({ where: { id: +id } })
        return res.status(200).json(user)
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body
        const user = await prisma.user.findFirst({ where: { email, password }, select: { password: false, id: true, name: true, email: true } })
        if(user) return res.status(200).json(user)
        return res.status(404).send("User not found")
    }

} -->


<!-- .env: DATABASE_URL="file:./dev.db" -->