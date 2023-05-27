import { ProductAttributes, Product } from "../models";

type ProductCreationDto = Omit<ProductAttributes, "id">;
type ProductUpdationDto = Partial<ProductCreationDto>;

export async function addProduct(newProduct: ProductCreationDto) {
    const { title, imageUrl, price, description } = newProduct;
    return await Product.create({ title, imageUrl, price, description });
}

export async function getAll() {
    const products = await Product.findAll();
    return products;
}

export async function getById(id: number) {
    const product = await Product.findByPk(id);
    return product;
}

export async function updateProduct(id: number, changedAttributes: ProductUpdationDto) {
    const product = await Product.findByPk(id);
    return await product.update({ ...changedAttributes });
}

export async function deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    return await product.destroy();
}
