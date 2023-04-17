import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import { UserDataBody } from "../repositories/userRepository";
import userServices from "../services/userServices";
import { Response } from "express";
import httpStatus from "http-status";

export async function getUserData(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const userData = await userServices.findUserData(userId);
        return res.status(httpStatus.OK).send({
            userName: userData.name, 
            userPhoto: userData.image,
            userEmail: userData.email,
            userId: userData.id
        });
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para ver seus dados!");
        return res.status(httpStatus.NOT_FOUND).send("Você não criou sua conta ainda!");
    }
}

export async function putUserData(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { userDataBody } = req.body;
    const userData = userDataBody as UserDataBody

    try {
        await userServices.updateUserData(userId, userData);
        return res.status(httpStatus.NO_CONTENT).send("Você atualizou seu dado com sucesso!");
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para atualizar seus dados!");
        return res.status(httpStatus.NOT_FOUND).send("Você não criou sua conta ainda update!");
    }
}

export async function logoutUser(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const response = await userServices.deleteUserSession(userId);
        return res.status(httpStatus.OK).send("Você deslogou com sucesso!");
    } catch (error) {
        if (error.status === 401) return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para deslogar!");
        return res.status(httpStatus.NOT_FOUND).send("Você não criou sua conta ainda!");
    }
}