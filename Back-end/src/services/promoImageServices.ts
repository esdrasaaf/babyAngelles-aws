import { notFoundError } from "../errors/notFound-error";
import promoImageRepository from "../repositories/promoImagesRepository";
import { PromotionsImages } from "@prisma/client";

async function findManyPromotionImages(): Promise<PromotionsImages[]> {
    const images = await promoImageRepository.getPromos();
    if (images.length === 0) throw notFoundError();

    return images;
}

const promotionImageService ={
    findManyPromotionImages
}

export default promotionImageService;