import { Request, Response } from "express"
import { PrismaClient } from "../../generated/prisma"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export default {
    create: async (req: Request, res: Response) => {
        const { name, email, password, telephone, cep } = req.body

        try {
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    telephone,
                    cep
                }
            })

            return res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar usuário." })
        }
    },

    show: async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    telephone: true,
                    cep: true
                }
            });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar usuário" });
        }
    },

    read: async (req: Request, res: Response) => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                telephone: true,
                cep: true
            }
        })
        return res.status(200).json(users)
    },

    update: async (req: Request, res: Response) => {
        const id = +req.params.id
        const data = req.body

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }

        const user = await prisma.user.update({
            data,
            where: { id }
        })

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    },

    delete: async (req: Request, res: Response) => {
        const id = +req.params.id
        try {
            await prisma.feedback.deleteMany({ where: { userId: id } })
            await prisma.pet.deleteMany({ where: { userId: id } })
            await prisma.user.delete({ where: { id } })

            return res.status(200).json({ message: "Usuário deletado com sucesso." })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro ao deletar usuário." })
        }
    },


    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(404).send("Usuário não encontrado.")

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).send("Senha inválida.")

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    }
}
