import { prisma } from "../config/database";
import { Products, SavedProducts } from "@prisma/client";

async function getSaveds(userId: number): Promise<SavedProducts[]> {
    return prisma.savedProducts.findMany({
        where: {
            userId
        },
        include: {
            Products: {
                include: {
                    Avaliations: true
                }
            }
        }
    });
};

async function postSaved(userId: number, productId: number): Promise<SavedProductsWithProduct> {
    return prisma.savedProducts.create({
        data: {
            userId,
            productId
        },
        include: {
            Products: true
        }
    });
};

async function getUniqueSaved(userId: number, productId: number): Promise<SavedProducts[]> {
    return prisma.savedProducts.findMany({
        where: {
            userId,
            productId
        }
    });
};

async function deleteSaved(id: number): Promise<SavedProducts> {
    return prisma.savedProducts.delete({
        where: {
            id
        }
    });
};

const savedRepository = {
    getSaveds,
    postSaved,
    getUniqueSaved,
    deleteSaved
};

export type SavedProductsWithProduct = {
    id: number;
    userId: number;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
    Products: Products
}

export default savedRepository;