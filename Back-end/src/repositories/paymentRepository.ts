import { prisma } from "../config/database";
import { Prisma, Purchases } from "@prisma/client";

async function createPurchase(purchaseId: string, productId: number, userId: number): Promise<Purchases> {
    return prisma.purchases.create({
        data: {
            purchaseId,
            productId,
            userId
        }
    });
};

async function deletePurchase(purchaseId: string): Promise<Prisma.BatchPayload> {
    return prisma.purchases.deleteMany({
        where: {
            purchaseId
        }
    });
};

async function findManyPurchaseProducts(userId: number): Promise<Purchases[]> {
    return prisma.purchases.findMany({
        where: {
            userId,
            isCompleted: true
        },
        include: {
            Products: true
        }
    });
};

async function confirmPurchase(purchaseId: string): Promise<Prisma.BatchPayload> {
    return prisma.purchases.updateMany({
        data: {
            isCompleted: true
        },
        where: {
            purchaseId
        }
    });
};

async function findManyPurchases(purchaseId: string): Promise<Purchases[]> {
    return prisma.purchases.findMany({
        where: {
            purchaseId
        }
    });
};

const purchaseRepository = {
    createPurchase,
    deletePurchase,
    confirmPurchase,
    findManyPurchaseProducts,
    findManyPurchases
};

export default purchaseRepository;