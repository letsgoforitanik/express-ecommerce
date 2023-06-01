import express from "express";
import { userRepo, productRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const user = await userRepo.getUser(1);
    const products = await productRepo.getProducts(user);

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
