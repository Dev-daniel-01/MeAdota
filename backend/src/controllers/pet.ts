import { Request, Response } from "express"
import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient()

export default {
    create: async (req: Request, res: Response) => {
        try {
            const pet = await prisma.pet.create({ data: req.body })
            return res.status(201).json(pet)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar pet." })
        }
    },

    read: async (req: Request, res: Response) => {
        const pets = await prisma.pet.findMany({
            select: {
                id: true,
                image: true,
                animal: true,
                name: true,
                race: true,
                description: true,
                age: true,
                size: true,
                available: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        cep: true
                    }
                }
            }
        })
        return res.status(200).json(pets)
    },

    update: async (req: Request, res: Response) => {
        const id = +req.params.id
        const pet = await prisma.pet.update({
            data: req.body,
            where: { id }
        })
        return res.status(200).json(pet)
    },

    delete: async (req: Request, res: Response) => {
        const id = +req.params.id
        await prisma.pet.delete({ where: { id } })
        return res.status(200).json({ message: "Pet deletado com sucesso." })
    }
}
