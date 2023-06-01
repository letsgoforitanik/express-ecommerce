import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "root",
    database: "shop",
    dialect: "mysql",
    define: {
        underscored: true,
    },
});

export default sequelize;
