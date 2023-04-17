import { prisma } from "../config/database";
import { Avaliations } from "@prisma/client";

async function getAvaliationsByProductId(productId: number): Promise<Avaliations[]> {
    return prisma.avaliations.findMany({
        where: {
            productId
        },
        include: {
            User: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    });
};

async function getAvaliationsByUserId(userId: number): Promise<Avaliations[]> {
    return prisma.avaliations.findMany({
        where: {
            userId
        },
        include: {
            Products: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    });
};

async function getAvaliationsById(avaliationId: number): Promise<Avaliations> {
    return prisma.avaliations.findFirst({
        where: {
            id: avaliationId
        }
    });
};

async function createAvaliation(userId: number, productId: number, avaliation: string, rating: number): Promise<Avaliations> {
    return prisma.avaliations.create({
        data: {
            userId,
            productId,
            avaliation,
            rating
        }
    });
};

async function putAvaliantionById(avaliationId: number, avaliation: string, rating: number): Promise<Avaliations> {
    return prisma.avaliations.update({
        where: {
            id: avaliationId
        },
        data: {
            avaliation,
            rating
        }
    });
};

async function deleteAvaliationById(avaliationId: number): Promise<Avaliations> {
    return prisma.avaliations.delete({
        where: {
            id: avaliationId
        }
    });
};

const avaliationsRepositories = {
    getAvaliationsById,
    getAvaliationsByProductId,
    getAvaliationsByUserId,
    createAvaliation,
    putAvaliantionById,
    deleteAvaliationById
};

export default avaliationsRepositories;