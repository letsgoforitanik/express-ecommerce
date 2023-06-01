import { cartRepo } from ".";
import { OrderItem, Product, User } from "../models";

export async function createOrder(user: User) {
    const products = await cartRepo.getCartProducts(user);
    products.forEach((p) => (p.OrderItem = { quantity: p.CartItem.quantity } as OrderItem));
    const order = await user.createOrder();
    await order.addProducts(products);
    await cartRepo.emptyCart(user);
}

export async function getUserOrders(user: User) {
    const orders = await user.getOrders({ include: Product });
    return orders;
}
