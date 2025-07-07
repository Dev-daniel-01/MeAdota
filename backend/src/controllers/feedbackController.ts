import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default {
  // Criar novo feedback
  create: async (req: Request, res: Response) => {
    const { comment, rating, userId, petId, image } = req.body;

    try {
      const feedback = await prisma.feedback.create({
        data: {
          comment,
          image,
          rating,
          userId,
          petId,
        },
      });
      return res.status(201).json(feedback);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar feedback." });
    }
  },

  // Listar todos feedbacks (opcional)
  read: async (req: Request, res: Response) => {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        user: { select: { id: true, name: true } },
        pet: { select: { id: true, name: true } },
      },
    });
    return res.status(200).json(feedbacks);
  },

  // Listar feedbacks por pet
  readByPet: async (req: Request, res: Response) => {
    const petId = Number(req.params.petId);
    const feedbacks = await prisma.feedback.findMany({
      where: { petId },
      include: { user: { select: { id: true, name: true } } },
    });
    return res.status(200).json(feedbacks);
  },
};
