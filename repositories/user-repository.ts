import { User } from "../models";
import { ProductCreationDto } from "../types";

export async function getUser(userId: number) {
    return await User.findByPk(userId);
}

export async function addUserProduct(user: User, productAttributes: ProductCreationDto) {
    return user.createProduct(productAttributes);
}

export async function getUserProducts(user: User) {
    return await user.getProducts();
}

export async function getUserCart(user: User) {
    let cart = await user.getCart();
    if (!cart) cart = await user.createCart();
    return cart;
}
