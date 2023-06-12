import { ObjectId } from "mongodb";
import { Product } from "./product-model";
import getDb from "../helpers/getDb";

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartProduct {
    product: Product;
    quantity: number;
}

interface CartData {
    items: CartItem[];
}

export class Cart implements CartData {
    items: CartItem[];
    userId: string;

    constructor(items: CartItem[], userId: string) {
        this.items = items;
        this.userId = userId;
    }

    async getCollection() {
        const db = await getDb();
        return db.collection("users");
    }

    async addProduct(productId: string) {
        const productExists = this.items.find((item) => item.productId === productId);

        if (!productExists) this.items = [...this.items, { productId, quantity: 1 }];
        else {
            this.items = this.items.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
        }

        await this.syncCart();
    }

    async destroyProduct(productId: string) {
        this.items = this.items.filter((item) => item.productId !== productId);
        await this.syncCart();
    }

    async clear() {
        this.items = [];
        await this.syncCart();
    }

    async syncCart() {
        const usersCollection = await this.getCollection();
        await usersCollection.updateOne({ _id: new ObjectId(this.userId) }, { $set: { cart: { items: this.items } } });
    }

    async getProducts() {
        const productIds = this.items.map((item) => new ObjectId(item.productId));
        const products = await Product.findAll({ _id: { $in: productIds } });

        const cartProducts: CartProduct[] = [];

        for (let item of this.items) {
            const product = products.find((p) => p.id === item.productId);
            cartProducts.push({ product, quantity: item.quantity });
        }

        return cartProducts;
    }
}
