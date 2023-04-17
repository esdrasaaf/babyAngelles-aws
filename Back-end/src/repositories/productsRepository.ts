import { prisma } from "../config/database";
import { Products } from "@prisma/client";

export type ProductsFilter = {
    categoryIds: number[], 
    colorIds: number[], 
    brandIds: number[]
}

async function getProducts(productsFilter: ProductsFilter): Promise<Products[]> {
    let filter = {
        where: {}
    };

    if (productsFilter.categoryIds.length !== 0) {
        filter.where = {...filter.where, categoryId: { in: productsFilter.categoryIds }}
    }

    if (productsFilter.colorIds.length !== 0) {
        filter.where = {...filter.where, colorId: { in: productsFilter.colorIds }}
    }

    if (productsFilter.brandIds.length !== 0) {
        filter.where = {...filter.where, brandId: { in: productsFilter.brandIds }}
    }

    return prisma.products.findMany({
        ...filter,
        orderBy:{
            id: 'asc'
        },
        include: {
            Avaliations: true
        }
    });
};

async function getManySearchedProducts(search: string){
    return prisma.products.findMany({
        where:{
            name:{
                contains: search,
                mode: "insensitive"
            }
        },
        include: {
            Avaliations: true
        }
    })
}

async function getProductsById(id: number): Promise<Products> {
    return prisma.products.findFirst({
        where: { 
            id 
        },
        include: {
            Categories: true,
            Colors: true,
            Brands: true,
            Avaliations: true
        }
    })
};

async function getProductsByCategoryId(categoryId: number): Promise<Products[]> {
    return prisma.products.findMany({
        where: {
            categoryId
        }, 
        orderBy: {
            id: 'asc'
        },
        include: {
            Avaliations: true
        }
    });
};

async function getProductsByColorId(colorId: number): Promise<Products[]> {
    return prisma.products.findMany({
        where: {
            colorId
        }, 
        orderBy: {
            id: 'asc'
        }
    });
};

async function getProductsByBrandId(brandId: number): Promise<Products[]> {
    return prisma.products.findMany({
        where: {
            brandId
        }, 
        orderBy: {
            id: 'asc'
        }
    });
};

async function getReleaseProducts(): Promise<Products[]> {
    return prisma.products.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc'
        }
    });
};

async function getBestSellersProducts(): Promise<Products[]> {
    return prisma.products.findMany({
        take: 10,
        orderBy: {
            numberOfSales: 'desc'
        }
    });
};

async function incrementNumberOfSales(productId: number, newNumberOfSales: number): Promise<Products> {
    return prisma.products.update({
        where: {
            id: productId
        },
        data: {
            numberOfSales: newNumberOfSales
        }
    });
};

const productsRepositories = {
    getProducts,
    getProductsById,
    getProductsByCategoryId,
    getProductsByBrandId,
    getProductsByColorId,
    getReleaseProducts,
    getBestSellersProducts,
    getManySearchedProducts,
    incrementNumberOfSales
};

export default productsRepositories;