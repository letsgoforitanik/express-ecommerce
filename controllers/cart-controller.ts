import express from "express";
import { cartRepo, userRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const user = await userRepo.getUser(1);
    const cartProducts = await cartRepo.getUserCartProducts(user);

    response.render("cart/index", {
        pageTitle: "Cart",
        activeLink: "cart",
        cartProducts,
    });
});

router.post("/add", async function (request, response) {
    const productId = Number(request.body.id);
    const user = await userRepo.getUser(1);
    await cartRepo.addProductToUserCart(user, productId);
    response.redirect("/");
});

router.post("/delete", async function (request, response) {
    const productId = Number(request.body.productId);
    const user = await userRepo.getUser(1);
    await cartRepo.deleteProductFromUserCart(user, productId);
    response.redirect("/cart");
});

export { router };
