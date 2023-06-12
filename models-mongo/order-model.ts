import { WithId, Document, ObjectId } from "mongodb";
import getDb from "../helpers/getDb";

interface OrderProduct {
    id: string;
    quantity: number;
}

interface OrderData {
    id: string;
    userId: string;
    products: OrderProduct[];
}

export class Order implements OrderData {
    id: string;
    userId: string;
    products: OrderProduct[];

    constructor(o: WithId<Document>) {
        this.id = o._id.toString();
        this.userId = o.userId.toString();
        this.products = o.products.map((p) => ({ id: p.id.toString(), quantity: p.quantity }));
    }

    static async getCollection() {
        const db = await getDb();
        return db.collection("orders");
    }

    static async create(attributes: Partial<OrderData>) {
        const ordersCollection = await this.getCollection();

        const newAttributes = {
            userId: new ObjectId(attributes.userId),
            products: attributes.products.map((p) => ({ ...p, id: new ObjectId(p.id) })),
        };

        const result = await ordersCollection.insertOne(newAttributes);
        return new Order({ ...attributes, _id: result.insertedId });
    }

    static async findAll(options?: {}) {
        const ordersCollection = await this.getCollection();
        const orders = await ordersCollection.find(options).toArray();
        return orders.map((order) => new Order(order));
    }
}
