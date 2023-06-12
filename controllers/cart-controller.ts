import express from "express";
import { cartRepo, userRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const user = await userRepo.getUser("648422ce024283a52110999d");
    const cartProducts = await cartRepo.getCartProducts(user);

    response.render("cart/index", {
        pageTitle: "Cart",
        activeLink: "cart",
        cartProducts,
    });
});

router.post("/add", async function (request, response) {
    const productId = request.body.id;
    const user = await userRepo.getUser("648422ce024283a52110999d");

    await cartRepo.addProductToCart(user, productId);
    response.redirect("/");
});

router.post("/delete", async function (request, response) {
    const productId = request.body.productId;
    const user = await userRepo.getUser("648422ce024283a52110999d");

    await cartRepo.removeProductFromCart(user, productId);
    response.redirect("/cart");
});

export { router };
