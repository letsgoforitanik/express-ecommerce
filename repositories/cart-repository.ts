import { User } from "../models";

async function getUserCart(user: User) {
    let cart = await user.getCart();
    if (!cart) cart = await user.createCart();
    return cart;
}

export async function addProductToCart(user: User, productId: number) {
    const cart = await getUserCart(user);

    console.log("user-cart", cart.toJSON());

    const products = await cart.getProducts({ where: { id: productId } });

    let quantity = 1;

    if (products.length > 0) quantity = products[0].CartItem.quantity + 1;
    await cart.addProducts(productId, { through: { quantity } });
}

export async function getCartProducts(user: User) {
    const cart = await getUserCart(user);
    return await cart.getProducts();
}

export async function removeProductFromCart(user: User, productId: number) {
    const cart = await getUserCart(user);
    const products = await cart.getProducts({ where: { id: productId } });
    products[0].CartItem?.destroy();
}

export async function emptyCart(user: User) {
    const cart = await getUserCart(user);
    await cart.setProducts(null);
}
