import colorServices from "../services/colorsServices";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllColors(req: Request, res: Response) {
    try {
        const colors = await colorServices.findManyColors();
        return res.status(httpStatus.OK).send(colors);
    } catch (error) {
        return res.status(error.status).send("Não temos cores disponíveis no momento!");
    }
}
