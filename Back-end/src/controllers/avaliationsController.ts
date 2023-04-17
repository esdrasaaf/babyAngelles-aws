import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import avaliationsServices from "../services/avaliationServices";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAvaliations(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productId } = req.params;

    try {
        const avaliations = await avaliationsServices.findManyAvaliations(userId, Number(productId));
        return res.status(httpStatus.OK).send(avaliations);
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para ver as avaliações!");
        if (error.status === 404) return res.status(httpStatus.NOT_FOUND).send("O produto que você deseja ver as avaliações não existe!");
    }
}

export async function getUserAvaliations(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const avaliations = await avaliationsServices.findManyUserAvaliations(userId);
        return res.status(httpStatus.OK).send(avaliations);
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para ver as avaliações!");
    }
}

export async function postAvaliations(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productId, avaliation, rating } = req.body

    try {
        const createdAvaliation = await avaliationsServices.createUserAvaliation(userId, productId, avaliation, rating);
        return res.status(httpStatus.CREATED).send(createdAvaliation);
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para fazer uma avaliação!");
        if (error.status === 404) return res.status(httpStatus.NOT_FOUND).send("O produto que você deseja avaliar não existe!");
        if (error.status === 400) return res.status(httpStatus.BAD_REQUEST).send("Voce precisa escrever algo para fazer uma avaliação!");
    }
}

export async function putAvaliations(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { avaliationId, avaliation, rating } = req.body;

    try {
        await avaliationsServices.updateUserAvaliation(userId, avaliationId, avaliation, rating);
        return res.status(httpStatus.OK).send('Você atualizou sua avaliação com sucesso');
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para fazer uma avaliação!");
        if (error.status === 404) return res.status(httpStatus.NOT_FOUND).send("A avaliação que você deseja atualizar não existe!");
        if (error.status === 400) return res.status(httpStatus.BAD_REQUEST).send("Voce precisa escrever algo para fazer uma avaliação!");
    }
}

export async function deleteAvaliations(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { avaliationId } = req.params;

    try {
        await avaliationsServices.deleteUserAvaliation(userId, Number(avaliationId));
        return res.status(httpStatus.OK).send(`Avaliação deletada com sucesso`);
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para deletar uma avaliação!");
        return res.status(httpStatus.NOT_FOUND).send("A avaliação que você quer deletar não existe!");
    }
}