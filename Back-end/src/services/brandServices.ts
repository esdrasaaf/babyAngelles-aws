import { notFoundError } from "../errors/notFound-error";
import brandRepository from "../repositories/brandRepository";
import { Brands } from "@prisma/client";

async function findManyBrands(): Promise<Brands[]> {
    const brands = await brandRepository.getBrands();
    if (brands.length === 0) throw notFoundError();

    return brands;
}

const brandServices ={
    findManyBrands
}

export default brandServices;