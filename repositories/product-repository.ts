import { User } from "../models-mongo/user-model";
import { Product, ProductData } from "../models-mongo/product-model";

export async function createProduct(user: User, productData: Partial<ProductData>) {
    await user.createProduct(productData);
}

export async function getProducts(user: User) {
    const products = await user.getProducts();
    return products;
}

export async function getById(id: string) {
    return await Product.findById(id);
}

export async function updateProduct(id: string, changedAttributes: Partial<ProductData>) {
    await Product.updateById(id, changedAttributes);
}

export async function deleteProduct(id: string) {
    await Product.deleteById(id);
}
