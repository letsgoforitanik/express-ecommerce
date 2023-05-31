import { Product } from "../models";
import { ProductCreationDto, ProductUpdationDto } from "../types";

export async function addProduct(newProduct: ProductCreationDto) {
    const { title, imageUrl, price, description } = newProduct;
    return await Product.create({ title, imageUrl, price, description });
}

export async function getAll() {
    return await Product.findAll();
}

export async function getById(id: number) {
    return await Product.findByPk(id);
}

export async function updateProduct(id: number, changedAttributes: ProductUpdationDto) {
    const product = await Product.findByPk(id);
    return await product.update({ ...changedAttributes });
}

export async function deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    return await product.destroy();
}
