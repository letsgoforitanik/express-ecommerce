import { Product, User } from "../models";
import { ProductCreationDto, ProductUpdationDto } from "../types";

export async function createProduct(user: User, productData: ProductCreationDto) {
    await user.createProduct(productData);
}

export async function getProducts(user: User) {
    const products = await Product.findAll({ where: { UserId: user.id } });
    return products;
}

export async function getById(id: number) {
    return await Product.findByPk(id);
}

export async function updateProduct(id: number, changedAttributes: ProductUpdationDto) {
    await Product.update(changedAttributes, { where: { id } });
}

export async function deleteProduct(id: number) {
    await Product.destroy({ where: { id } });
}
