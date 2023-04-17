import { notFoundError } from "../errors/notFound-error";
import categoryRepository from "../repositories/categoryRepositoy";
import { Categories } from "@prisma/client";

async function findManyCategories(): Promise<Categories[]> {
    const categories = await categoryRepository.getCategories();
    if (categories.length === 0) throw notFoundError();

    return categories;
}

const categoryServices ={
    findManyCategories
}

export default categoryServices;