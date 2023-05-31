import express from "express";
import { cartRepo, userRepo } from "../repositories";

const router = express.Router();

router.post("/add", async function (request, response) {
    const productId = Number(request.body.id);
    const user = await userRepo.getUser(1);
    const userCart = await userRepo.getUserCart(user);
    await cartRepo.addProductToCart(userCart, productId);
    response.redirect("/");
});

export { router };
