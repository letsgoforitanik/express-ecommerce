import { ProductData } from "../models/product-model";
import { UserData } from "../models/user-model";

export async function addProductToCart(user: UserData, productId: string) {
    await user.addToCart(productId);
}

export async function getCartProducts(user: UserData) {
    const userInfo = await user.populate("cart.items.productId");

    const cartProducts = userInfo.cart.items.map((item: any) => ({
        detail: item.productId as ProductData,
        quantity: item.quantity as number,
    }));

    return cartProducts;
}

export async function removeProductFromCart(user: UserData, productId: string) {
    await user.deleteFromCart(productId);
}

export async function emptyCart(user: UserData) {
    await user.clearCart();
}
