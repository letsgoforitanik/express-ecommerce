import { cartRepo } from ".";
import { Order } from "../models";
import { ProductData } from "../models/product-model";
import { UserData } from "../models/user-model";

export async function createOrder(user: UserData) {
    const cartProducts = await cartRepo.getCartProducts(user);
    const orderItems = cartProducts.map((cp) => ({ productId: cp.detail._id, quantity: cp.quantity }));
    await Order.create({ userId: user, items: orderItems });
    await cartRepo.emptyCart(user);
}

export async function getUserOrders(user: UserData) {
    const orders = await Order.find({ userId: user }).populate("items.productId");
    const ordersWithProducts = orders.map((order) => ({
        id: order.id,
        items: order.items.map((item: any) => ({
            product: item.productId as ProductData,
            quantity: item.quantity as number,
        })),
    }));

    return ordersWithProducts;
}
