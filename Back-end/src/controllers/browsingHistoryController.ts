import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import browsingHistoryServices from "../services/browsingHistoryServices";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHistoricNavigation(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const historics = await browsingHistoryServices.findManyHistoric(userId);
        return res.status(httpStatus.OK).send(historics);
    } catch (error) {        
        return res.status(error.status).send("Você precisa estar logado para ver seu histórico!");
    }
}

export async function postHistoric(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productId } = req.body;

    try {
        const response = await browsingHistoryServices.insertUniqueHistoric(userId, productId);
        return res.status(httpStatus.CREATED).send(`Você acessou o produto de id ${response.productId}`);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("O produto que você escolheu não existe mais em nosso estoque!");
        return res.status(error.status).send("Você precisa estar logado para adicionar algo em seu histórico!");
    }
}

export async function deleteHistoric(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { historicId } = req.params;

    try {
        const response = await browsingHistoryServices.deleteUniqueHistoric(userId, Number(historicId));
        return res.status(httpStatus.CREATED).send(`Você deletou o histórico de id ${response.id}`);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("O produto que você escolheu não existe mais em nosso estoque!");
        return res.status(error.status).send("Você precisa estar logado para adicionar algo em seu histórico!");
    }
}

