import { ObjectId, WithId, Document } from "mongodb";
import { Product, ProductData } from "./product-model";
import { Cart } from "./cart-model";
import { Order } from "./order-model";
import getDb from "../helpers/getDb";

interface UserData {
    id: string;
    name: string;
    email: string;
    cart: Cart;
}

export class User implements UserData {
    id: string;
    name: string;
    email: string;
    cart: Cart;

    constructor(u: WithId<Document>) {
        this.id = u._id.toString();
        this.name = u.name;
        this.email = u.email;
        this.cart = u.cart;
    }

    static async getCollection() {
        const db = await getDb();
        return db.collection("users");
    }

    static async create(attributes: Partial<UserData>) {
        const usersCollection = await this.getCollection();
        const result = await usersCollection.insertOne({ ...attributes, cart: [] });

        return new User({
            ...attributes,
            _id: result.insertedId,
            cart: new Cart([], result.insertedId.toString()),
        });
    }

    static async findById(userId: string) {
        const usersCollection = await this.getCollection();
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        return new User({ ...user, cart: new Cart(user.cart.items, user._id.toString()) });
    }

    async createProduct(data: Partial<ProductData>) {
        return await Product.create(data, this.id);
    }

    async getProducts() {
        const userId = new ObjectId(this.id);
        return await Product.findAll({ userId });
    }

    async createOrder() {
        const products = this.cart.items.map((item) => ({ id: item.productId, quantity: item.quantity }));
        const order = await Order.create({ products, userId: this.id });
        await this.cart.clear();
        return order;
    }

    async getOrders() {
        const orders = await Order.findAll({ userId: new ObjectId(this.id) });

        const productIds = new Set<string>();
        orders.forEach((order) => order.products.forEach((product) => productIds.add(product.id)));

        const allProducts = await Product.findAll({ _id: { $in: Array.from(productIds).map((id) => new ObjectId(id)) } });

        return orders.map((order) => ({
            ...order,
            products: order.products.map((op) => ({
                ...op,
                detail: allProducts.find((p) => p.id === op.id),
            })),
        }));
    }
}
