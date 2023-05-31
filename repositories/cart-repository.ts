import { User } from "../models";
import { userRepo } from ".";

export async function addProductToUserCart(user: User, productId: number) {
    const cart = await userRepo.getUserCart(user);
    const products = await cart.getProducts({ where: { id: productId } });

    let quantity = 1;

    if (products.length > 0) quantity = products[0].CartItem.quantity + 1;
    await cart.addProducts(productId, { through: { quantity } });
}

export async function getUserCartProducts(user: User) {
    const cart = await userRepo.getUserCart(user);
    return await cart.getProducts();
}

export async function deleteProductFromUserCart(user: User, productId: number) {
    const cart = await userRepo.getUserCart(user);
    const products = await cart.getProducts({ where: { id: productId } });
    products[0].CartItem?.destroy();
}
