import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import { ProductsFilter } from "../repositories/productsRepository";
import productsServices from "../services/productsServices";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllProducts(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productsFilter } = req.body;
    const filter = productsFilter as ProductsFilter;

    try {
        const products = await productsServices.findManyProducts(userId, filter);
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Não temos produtos disponíveis no momento!");
        return res.status(401).send(error.message);
    }
}

export async function getSearchProducts(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productName } = req.params;

    try {
        const products = await productsServices.findManySearchProducts(userId, productName);
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Não temos produtos disponíveis no momento!");
        return res.status(401).send(error.message);
    }
}

export async function getProductById(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { productId } = req.params;

    try {
        const products = await productsServices.findUniqueProduct(userId, Number(productId));
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        console.log(error.status)
        if (error.status === 404) return res.status(error.status).send("Este produto não existe em nosso estoque!");
        return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para acessar os produtos da loja!");
    }
}

export async function getProductByCategory(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { categoryId } = req.params;

    try {
        const products = await productsServices.findManyByCategoryId(userId, Number(categoryId));
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Não temos produtos disponíveis no momento!");
        return res.status(httpStatus.UNAUTHORIZED).send("Você precisa estar logado para acessar os produtos da loja!");
    }
}

export async function getProductByColor(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { colorId } = req.params;

    try {
        const products = await productsServices.findManyByColorId(userId, Number(colorId));
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Não temos produtos disponíveis no momento!");
        return res.status(error.status).send("Você precisa estar logado para acessar os produtos da loja!");
    }
}

export async function getProductByBrand(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { brandId } = req.params;

    try {
        const products = await productsServices.findManyByBrandId(userId, Number(brandId));
        return res.status(httpStatus.OK).send(products);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Não temos produtos disponíveis no momento!");
        return res.status(error.status).send("Você precisa estar logado para acessar os produtos da loja!");
    }
}

export async function getReleaseProducts(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const releases = await productsServices.findManyReleases(userId);
        return res.status(httpStatus.OK).send(releases);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Não temos novos produtos no momento!");
        return res.status(error.status).send("Você precisa estar logado para acessar os novos produtos!");
    }
}

export async function getBestSellersProducts(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const bestsellers = await productsServices.findManyBestSellers(userId);
        return res.status(httpStatus.OK).send(bestsellers);
    } catch (error) {
        if (error.status === 404) return res.status(error.status).send("Nenhum produto do nosso estoque foi comprado ainda!");
        return res.status(error.status).send("Você precisa estar logado para acessar os produtos mais vendidos!");
    }
}
