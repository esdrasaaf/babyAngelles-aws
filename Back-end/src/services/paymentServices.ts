import { badRequestError } from "../errors/badRequest-error";
import { unauthorizedError } from "../errors/unauthorized-error";
import authRepositories from "../repositories/authRepository";
import purchaseRepository from "../repositories/paymentRepository";
import productsRepositories from "../repositories/productsRepository";
import { Products, Purchases } from "@prisma/client";
import { Stripe } from "stripe";
import { v4 as uuid } from "uuid";

const stripe = new Stripe("sk_test_51Mwq2PExmIu0T0oR7VGNX6RCNNfHrXSM5R7dSUWCZSeYKp4C6M5aj0u7uYqQO6C14UHH5cy4A2Ihin24riaLZ45a007ejrZpcJ", {
    apiVersion: "2022-11-15",
});

async function createPaymentSession(userId: number, arrayOfProducts: Products[]) {
    const purchaseId = uuid();

    try {
        for (let i = 0; i < arrayOfProducts.length; i++) {
            await purchaseRepository.createPurchase(purchaseId, arrayOfProducts[i].id, userId);
        }
    } catch (error) {
        console.log(error);
        throw badRequestError();
    }

    const lineItens = arrayOfProducts.map((p) => {
        const price_data = {
            currency: 'brl',
            product_data: {
                name: `${p.name}`
            },
            unit_amount: Number(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price).replace("R$", "").replace(",", ".")) * 100,
        }  
        
        return { price_data, quantity: 1 }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'payment',
        line_items: lineItens,
        success_url: `${process.env.APP_URL}/success/${purchaseId}`,
        cancel_url: `${process.env.APP_URL}/cancel/${purchaseId}`,
    });

    return session.url;
}

async function savePayment(userId: number, purchaseId: string) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await purchaseRepository.confirmPurchase(purchaseId);
}

async function getProducts(userId: number) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const products = await purchaseRepository.findManyPurchaseProducts(userId);

    const arrProductsIds = [] as number[];
    const purchaseArray = [] as Purchases[];

    for (let i = 0; i < products.length; i++) {
        if (!arrProductsIds.includes(products[i].productId)) {
            purchaseArray.push(products[i]);
        }

        arrProductsIds.push(products[i].productId);
    }

    return purchaseArray
}

async function excludePayment(userId: number, purchaseId: string) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    return await purchaseRepository.deletePurchase(purchaseId);
}

async function incrementNumberOfSales(userId: number, purchaseId: string) {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const purchaseProducts = await purchaseRepository.findManyPurchases(purchaseId);

    for (let i = 0; i < purchaseProducts.length; i++) {
        const newNumberOfSales = await productsRepositories.getProductsById(purchaseProducts[i].productId);
        await productsRepositories.incrementNumberOfSales(purchaseProducts[i].productId, (newNumberOfSales.numberOfSales + 1))
    }

    return purchaseProducts
}

const paymentService = {
    createPaymentSession,
    savePayment,
    excludePayment,
    getProducts,
    incrementNumberOfSales
}

export default paymentService;