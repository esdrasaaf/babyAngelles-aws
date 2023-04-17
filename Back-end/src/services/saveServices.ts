import { badRequestError } from "../errors/badRequest-error";
import { unauthorizedError } from "../errors/unauthorized-error";
import authRepositories from "../repositories/authRepository";
import productsRepositories from "../repositories/productsRepository";
import savedRepository, { SavedProductsWithProduct } from "../repositories/savesRepository";
import { SavedProducts } from "@prisma/client";

async function findManySaveds(userId: number): Promise<SavedProducts[]> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await savedRepository.getSaveds(userId);
}

async function createSavedProduct(userId: number, productId: number): Promise<SavedProductsWithProduct | "delete"> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const product = await productsRepositories.getProductsById(productId);
    if (!product) throw badRequestError();

    const savedProductsExist = await savedRepository.getUniqueSaved(userId, productId);
    if (savedProductsExist.length === 0) return await savedRepository.postSaved(userId, productId);

    await savedRepository.deleteSaved(savedProductsExist[0].id);
    
    return "delete"
}

const savedServices = {
    findManySaveds,
    createSavedProduct
}

export default savedServices;