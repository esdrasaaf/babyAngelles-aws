import { notFoundError } from "../errors/notFound-error";
import colorsRepository from "../repositories/colorRepository";
import { Colors } from "@prisma/client";

async function findManyColors(): Promise<Colors[]> {
    const colors = await colorsRepository.getColors();
    if (colors.length === 0) throw notFoundError();

    return colors;
}

const colorServices ={
    findManyColors
}

export default colorServices;