import express from "express";
import { orderRepo, userRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const user = await userRepo.getUser("6488c86e663262629ff0d39b");
    const orders = await orderRepo.getUserOrders(user);

    response.render("order/index", {
        pageTitle: "Orders",
        activeLink: "orders",
        orders,
    });
});

router.post("/create", async function (_, response) {
    const user = await userRepo.getUser("6488c86e663262629ff0d39b");
    await orderRepo.createOrder(user);
    response.redirect("/cart");
});

export { router };
