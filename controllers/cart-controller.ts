import express from "express";
import { cartRepo, userRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const user = await userRepo.getUser("6488c86e663262629ff0d39b");
    const cartProducts = await cartRepo.getCartProducts(user);

    response.render("cart/index", {
        pageTitle: "Cart",
        activeLink: "cart",
        cartProducts,
    });
});

router.post("/add", async function (request, response) {
    const productId = request.body.id;
    const user = await userRepo.getUser("6488c86e663262629ff0d39b");

    await cartRepo.addProductToCart(user, productId);
    response.redirect("/");
});

router.post("/delete", async function (request, response) {
    const productId = request.body.productId;
    const user = await userRepo.getUser("6488c86e663262629ff0d39b");

    await cartRepo.removeProductFromCart(user, productId);
    response.redirect("/cart");
});

export { router };
