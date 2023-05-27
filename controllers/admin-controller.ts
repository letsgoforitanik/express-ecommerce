import express from "express";
import { productRepo } from "../repositories";

const router = express.Router();

router.get("/products", async function (_, response) {
    const products = await productRepo.getAll();

    response.render("admin/product-list", {
        pageTitle: "Admin Products",
        activeLink: "admin-products",
        products,
    });
});

router.get("/add-product", function (_, response) {
    response.render("admin/add-product", {
        pageTitle: "Add Product",
        activeLink: "add-product",
    });
});

router.post("/add-product", async function (request, response) {
    const { title, price, description, imageUrl } = request.body;
    await productRepo.addProduct({ title, price, description, imageUrl });
    response.redirect("/");
});

router.get("/edit-product/:id", async function (request, response) {
    const productId = Number(request.params.id);
    const product = await productRepo.getById(productId);

    response.render("admin/edit-product", {
        pageTitle: "Edit Product",
        activeLink: null,
        product,
    });
});

router.post("/edit-product", async function (request, response) {
    const { id, title, description, price, imageUrl } = request.body;
    const changedAttributes = { title, description, imageUrl, price: Number(price) };
    await productRepo.updateProduct(Number(id), changedAttributes);
    response.redirect("/admin/products");
});

router.post("/delete-product", async function (request, response) {
    const { id } = request.body;
    await productRepo.deleteProduct(Number(id));
    response.redirect("/admin/products");
});

export { router };
