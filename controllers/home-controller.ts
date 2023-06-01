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

export { router };
