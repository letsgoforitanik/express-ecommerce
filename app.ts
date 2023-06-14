import { createServer } from "http";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { productController, adminController } from "./controllers";
import { homeController, cartController, orderController } from "./controllers";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", homeController.router);
app.use("/admin", adminController.router);
app.use("/products", productController.router);
app.use("/cart", cartController.router);
app.use("/orders", orderController.router);

mongoose.connect("mongodb://127.0.0.1:27017/shop");

const server = createServer(app);

const port = 3000;

server.listen(port, () => console.log(`Server is running on port ${port}`));
