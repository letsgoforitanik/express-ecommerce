import { createServer } from "http";

import express from "express";
import bodyParser from "body-parser";

import { productController, adminController, homeController, cartController } from "./controllers";
import sequelize from "./helpers/sequelize";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", homeController.router);
app.use("/admin", adminController.router);
app.use("/products", productController.router);
app.use("/cart", cartController.router);

sequelize.sync().then(console.log);

const server = createServer(app);

const port = 3000;

server.listen(port, () => console.log(`Server is running on port ${port}`));
