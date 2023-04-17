import categoryServices from "../services/categoryServices";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllCategories(req: Request, res: Response) {
    try {
        const categories = await categoryServices.findManyCategories();
        return res.status(httpStatus.OK).send(categories);
    } catch (error) {
        return res.status(error.status).send("Não temos categorias disponíveis no momento!");
    }
}
