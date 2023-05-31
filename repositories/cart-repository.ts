import { Cart } from "../models";

export async function addProductToCart(cart: Cart, productId: number) {
    const products = await cart.getProducts({ where: { id: productId } });
    let quantity = 1;
    if (products.length > 0) quantity = products[0].CartItem.quantity + 1;
    await cart.addProducts(productId, { through: { quantity } });
}
