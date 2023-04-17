import { prisma } from "../config/database";
import { Colors } from "@prisma/client";

async function getColors(): Promise<Colors[]> {
    return prisma.colors.findMany({});
};

const colorsRepository = {
    getColors
};

export default colorsRepository;