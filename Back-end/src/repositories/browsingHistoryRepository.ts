import { prisma } from "../config/database";
import { BrowsingHistory } from "@prisma/client";

async function getHistorics(userId: number): Promise<BrowsingHistory[]> {
    return prisma.browsingHistory.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: "desc"
        },
        include: {
            Products: true
        }
    });
};

async function checkIfHistoricExist(userId: number, productId: number): Promise<BrowsingHistory> {
    return prisma.browsingHistory.findFirst({
        where: {
            userId,
            productId
        }
    });
};

async function getHistoricById(historicId: number): Promise<BrowsingHistory> {
    return prisma.browsingHistory.findFirst({
        where: {
            id: historicId
        }
    });
};

async function postHistorics(userId: number, productId: number): Promise<BrowsingHistory> {
    return prisma.browsingHistory.create({
        data: {
            userId,
            productId
        }
    });
};

async function updateHistoric(id: number): Promise<BrowsingHistory> {
    return prisma.browsingHistory.update({
        where: {
            id
        },
        data: {
            updatedAt: new Date()
        }
    });
};

async function deleteHistoricById(historicId: number): Promise<BrowsingHistory> {
    return prisma.browsingHistory.delete({
        where: {
            id: historicId
        }
    });
};

const browsingHistoryRepositories = {
    getHistorics,
    postHistorics,
    updateHistoric,
    checkIfHistoricExist,
    getHistoricById,
    deleteHistoricById
};

export default browsingHistoryRepositories;