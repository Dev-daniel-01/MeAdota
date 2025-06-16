import { Request, Response } from "express";
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

}