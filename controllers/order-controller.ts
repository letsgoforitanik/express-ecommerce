import express from "express";
import { orderRepo, userRepo } from "../repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const user = await userRepo.getUser("648422ce024283a52110999d");
    const orders = await orderRepo.getUserOrders(user);

    response.render("order/index", {
        pageTitle: "Orders",
        activeLink: "orders",
        orders,
    });
});

router.post("/create", async function (_, response) {
    const user = await userRepo.getUser("648422ce024283a52110999d");
    await orderRepo.createOrder(user);
    response.redirect("/cart");
});

export { router };
