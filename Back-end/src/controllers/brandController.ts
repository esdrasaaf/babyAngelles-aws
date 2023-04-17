import brandServices from "../services/brandServices";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllBrands(req: Request, res: Response) {
    try {
        const brands = await brandServices.findManyBrands();
        return res.status(httpStatus.OK).send(brands);
    } catch (error) {
        return res.status(error.status).send("Não temos marcas disponíveis no momento!");
    }
}
