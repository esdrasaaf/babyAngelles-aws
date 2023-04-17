import { badRequestError } from "../errors/badRequest-error";
import { unauthorizedError } from "../errors/unauthorized-error";
import { notFoundError } from "../errors/notFound-error";
import authRepositories from "../repositories/authRepository";
import avaliationsRepositories from "../repositories/avaliationsRepository";
import productsRepositories from "../repositories/productsRepository";
import { Avaliations } from "@prisma/client";

async function findManyAvaliations(userId: number, productId: number): Promise<Avaliations[]> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const product = await productsRepositories.getProductsById(productId);
    if (!product) throw notFoundError();

    return await avaliationsRepositories.getAvaliationsByProductId(productId);
}

async function findManyUserAvaliations(userId: number): Promise<Avaliations[]> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await avaliationsRepositories.getAvaliationsByUserId(userId);
}

async function createUserAvaliation(userId: number, productId: number, avaliation: string, rating: number): Promise<Avaliations> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const product = await productsRepositories.getProductsById(productId);
    if (!product) throw notFoundError();

    if (avaliation === "") throw badRequestError();
    
    return await avaliationsRepositories.createAvaliation(userId, productId, avaliation, rating);
}

async function updateUserAvaliation(userId: number, avaliationId: number, avaliation: string, rating: number) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const avaliations = await avaliationsRepositories.getAvaliationsById(avaliationId);
    if (!avaliations) throw notFoundError();

    if (avaliation === "") throw badRequestError();
    
    return await avaliationsRepositories.putAvaliantionById(avaliationId, avaliation, rating);
}

async function deleteUserAvaliation(userId: number, avaliationId: number) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const avaliation = await avaliationsRepositories.getAvaliationsById(avaliationId);
    if (!avaliation) throw notFoundError();

    return await avaliationsRepositories.deleteAvaliationById(avaliationId);
}

const avaliationsServices = {
    findManyAvaliations,
    findManyUserAvaliations,
    createUserAvaliation,
    updateUserAvaliation,
    deleteUserAvaliation
}

export default avaliationsServices;