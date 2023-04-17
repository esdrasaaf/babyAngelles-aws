import { notFoundError } from "../errors/notFound-error";
import { unauthorizedError } from "../errors/unauthorized-error";
import authRepositories from "../repositories/authRepository";
import browsingHistoryRepositories from "../repositories/browsingHistoryRepository";
import productsRepositories from "../repositories/productsRepository";
import { BrowsingHistory } from "@prisma/client";

async function findManyHistoric(userId: number): Promise<BrowsingHistory[]> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await browsingHistoryRepositories.getHistorics(userId);
}

async function insertUniqueHistoric(userId: number, productId: number): Promise<BrowsingHistory> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const product = await productsRepositories.getProductsById(productId);
    if (!product) throw notFoundError();

    const historicExist = await browsingHistoryRepositories.checkIfHistoricExist(userId, productId);
    if (historicExist)  {
        return await browsingHistoryRepositories.updateHistoric(historicExist.id);
    } else {
        return await browsingHistoryRepositories.postHistorics(userId, productId);        
    }
}

async function deleteUniqueHistoric(userId: number, historicId: number): Promise<BrowsingHistory> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const historicExist = await browsingHistoryRepositories.getHistoricById(historicId);
    if (!historicExist)  {
        throw notFoundError()
    } else {
        return await browsingHistoryRepositories.deleteHistoricById(historicId);        
    }
}

const browsingHistoryServices = {
    findManyHistoric,
    insertUniqueHistoric,
    deleteUniqueHistoric
}

export default browsingHistoryServices;