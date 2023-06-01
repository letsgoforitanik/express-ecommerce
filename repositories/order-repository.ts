import { cartRepo } from ".";
import { OrderItem, User } from "../models";
import { OrderDto } from "../types";

export async function createOrder(user: User) {
    const products = await cartRepo.getUserCartProducts(user);
    products.forEach((p) => (p.OrderItem = { quantity: p.CartItem.quantity } as OrderItem));
    const order = await user.createOrder();
    await order.addProducts(products);
    await cartRepo.emptyCart(user);
}

export async function getUserOrders(user: User) {
    const orders = await user.getOrders();
    const orderDtos: OrderDto[] = [];

    for (const order of orders) {
        const products = await order.getProducts();

        orderDtos.push({
            id: order.id,
            products: products.map((p) => ({
                id: p.id,
                title: p.title,
                quantity: p.OrderItem.quantity,
            })),
        });
    }

    return orderDtos;
}
