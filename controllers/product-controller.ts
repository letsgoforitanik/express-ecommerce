import express from "express";
import { productRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const products = await productRepo.getAll();

    response.render("product/product-list", {
        pageTitle: "Home",
        activeLink: "shop",
        products,
    });
});

router.get("/:id", async function (request, response) {
    const productId = Number(request.params.id);
    const product = await productRepo.getById(productId);

    response.render("product/product-details", {
        pageTitle: "Product Details ",
        activeLink: null,
        product,
    });
});

export { router };
