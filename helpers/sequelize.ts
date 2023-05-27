import { Sequelize, Options } from "sequelize";

const options: Options = {
    host: "localhost",
    username: "root",
    password: "root",
    database: "shop",
    dialect: "mysql",
};

const sequelize = new Sequelize(options);

export default sequelize;
