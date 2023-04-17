import { notFoundError } from "../errors/notFound-error";
import { unauthorizedError } from "../errors/unauthorized-error";
import authRepositories from "../repositories/authRepository";
import cartRepository, { CartWithProduct } from "../repositories/cartRepository";
import productsRepositories from "../repositories/productsRepository";
import { Cart } from "@prisma/client";

async function findManyCartProducts(userId: number): Promise<Cart[]> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await cartRepository.getCartByUserId(userId);
}

async function createCartObj(userId: number, productId: number): Promise<CartWithProduct> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const product = await productsRepositories.getProductsById(productId);
    if (!product) throw notFoundError();

    return await cartRepository.postCartObj(userId, productId);
}

async function deleteCartProduct(userId: number, cartId: number): Promise<CartWithProduct> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const cartItem = await cartRepository.getCartById(cartId);
    if (!cartItem) throw {
        name: "ForbiddenError",
        status: 403
    };

    return await cartRepository.deleteCart(cartId);
}

async function clearUserCart(userId: number) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await cartRepository.clearCart(userId);
}

const cartServices = {
    findManyCartProducts,
    createCartObj,
    deleteCartProduct,
    clearUserCart
}

export default cartServices;