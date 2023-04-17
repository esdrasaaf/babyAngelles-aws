import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import paymentService from "../services/paymentServices";
import { Products } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function postPurchase(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productsArray } = req.body;
    const arrayOfProducts = productsArray as Products[]

    try {
        const purchaseProducts = await paymentService.createPaymentSession(userId, arrayOfProducts);
        return res.status(httpStatus.CREATED).send(purchaseProducts);
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function deletePurchase(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { purchaseId } = req.params;

    try {
        await paymentService.excludePayment(userId, purchaseId);
        return res.status(httpStatus.CREATED).send("Compra cancelada com sucesso!");
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function confirmPurchase(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { purchaseId } = req.params;

    try {
        await paymentService.savePayment(userId, purchaseId);
        return res.status(httpStatus.CREATED).send("Compra confirmada com sucesso!");
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).send("Algo deu errado");
    }
}

export async function getUserPurchaseProducts(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const products = await paymentService.getProducts(userId);
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export async function putNumberOfSales(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { purchaseId } = req.params;

    try {
        await paymentService.incrementNumberOfSales(userId, purchaseId);
        return res.status(httpStatus.OK).send("Valores atualizados com sucesso!");
    } catch (error) {
        return res.status(400).send(error.message);
    }
}