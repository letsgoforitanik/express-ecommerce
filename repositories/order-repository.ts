import { User } from "../models-mongo/user-model";

export async function createOrder(user: User) {
    await user.createOrder();
}

export async function getUserOrders(user: User) {
    const orders = await user.getOrders();
    return orders;
}
