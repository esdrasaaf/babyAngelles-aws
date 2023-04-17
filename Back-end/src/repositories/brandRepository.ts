import { prisma } from "../config/database";
import { Brands } from "@prisma/client";

async function getBrands(): Promise<Brands[]> {
    return prisma.brands.findMany({});
};

const brandRepository = {
    getBrands
};

export default brandRepository;