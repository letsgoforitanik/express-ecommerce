import { User } from "../models/user-model";

export async function addProductToCart(user: User, productId: string) {
    await user.cart.addProduct(productId);
}

export async function getCartProducts(user: User) {
    return await user.cart.getProducts();
}

export async function removeProductFromCart(user: User, productId: string) {
    await user.cart.destroyProduct(productId);
}

export async function emptyCart(user: User) {
    await user.cart.clear();
}
