import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import cartServices from "../services/cartServices";
import { Response } from "express";
import httpStatus from "http-status";

export async function getUserCart(req: AuthenticatedRequest, res: Response) {
    const { userId } = req

    try {
        const cartProducts = await cartServices.findManyCartProducts(userId);
        return res.status(httpStatus.OK).send(cartProducts);
    } catch (error) {
        return res.status(error.status).send("Você deve estar logado para ver seu carrinho!");
    }
}

export async function postProductOnCart(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productId } = req.body as CartBody;

    try {
        const cartObj = await cartServices.createCartObj(userId, productId);
        return res.status(httpStatus.CREATED).send(`Você adicionou o ${cartObj.Products.name} ao seu carrinho`);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("O produto que você tentou adicionar não existe!");
        return res.status(error.status).send("Você deve estar logado para adicionar algo seu carrinho!");
    }
}

export async function deleteProductOfCart(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { cartId } = req.params as CartParams;

    try {
        const cartObj = await cartServices.deleteCartProduct(userId, Number(cartId));
        return res.status(httpStatus.OK).send(`Você deletou o ${cartObj.Products.name} do seu carrinho`);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("O produto que você tentou deletar não existe!");
        if (error.status === 403) return res.status(error.status).send("O produto que você tentou deletar não está no seu carrinho!");
        return res.status(httpStatus.UNAUTHORIZED).send("Você deve estar logado para adicionar algo seu carrinho!");
    }
}

export async function deleteAllCart(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        await cartServices.clearUserCart(userId);
        return res.status(httpStatus.OK).send(`Carrinho esvaziado com sucesso!`);
    } catch (error) {
        if (error.status === 401) return res.status(error.status).send("Você deve estar logado para esvaziar seu carrinho!");
        return res.status(500).send("Algo deu errado");
    }
}

export type CartBody = {
    productId: number
}

export type CartParams = {
    cartId: string
}