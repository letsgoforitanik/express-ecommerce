import { ObjectId, WithId, Document } from "mongodb";
import getDb from "../helpers/getDb";

export interface ProductData {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    userId: string;
}

export class Product implements ProductData {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    userId: string;

    constructor(p: WithId<Document>) {
        this.id = p._id.toString();
        this.title = p.title;
        this.imageUrl = p.imageUrl;
        this.price = p.price;
        this.description = p.description;
        this.userId = p.userId;
    }

    static async getCollection() {
        const db = await getDb();
        return db.collection("products");
    }

    static async create(attributes: Partial<ProductData>, userId?: string) {
        const productsCollection = await this.getCollection();
        const result = await productsCollection.insertOne({ ...attributes, userId: new ObjectId(userId) });
        return new Product({ ...attributes, _id: result.insertedId, userId });
    }

    static async findAll(options?: {}) {
        const productsCollection = await this.getCollection();
        const products = await productsCollection.find(options).toArray();
        return products.map((p) => new Product(p));
    }

    static async findById(productId: string) {
        const productsCollection = await this.getCollection();
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
        return new Product(product);
    }

    static async updateById(id: string, attributes: Partial<ProductData>) {
        const productsCollection = await this.getCollection();
        return await productsCollection.updateOne({ _id: new ObjectId(id) }, { $set: attributes });
    }

    static async update(filter: {}, attributes: Partial<ProductData>) {
        const productsCollection = await this.getCollection();
        return await productsCollection.updateOne(filter, { $set: attributes });
    }

    static async deleteById(id: string) {
        const productsCollection = await this.getCollection();
        return await productsCollection.deleteOne({ _id: new ObjectId(id) });
    }
}
