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

export { router };
