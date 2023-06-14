import { Product } from "../models";
import { UserData } from "../models/user-model";
import { ProductCreationDto, ProductUpdationDto } from "../types";

export async function createProduct(user: UserData, productData: ProductCreationDto) {
    await Product.create({ ...productData, userId: user });
}

export async function getProducts(user: UserData) {
    const products = await Product.find({ userId: user });
    return products;
}

export async function getById(id: string) {
    const product = await Product.findById(id);
    return product;
}

export async function updateProduct(id: string, changedAttributes: ProductUpdationDto) {
    await Product.findByIdAndUpdate(id, changedAttributes);
}

export async function deleteProduct(id: string) {
    await Product.findByIdAndRemove(id);
}
