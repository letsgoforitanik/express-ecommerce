import { Model, DataTypes } from "sequelize";

import sequelize from "../helpers/sequelize";
import { CartItemAttributes, ProductAttributes } from "../types";

export class Product extends Model<ProductAttributes> implements ProductAttributes {
    declare readonly id: number;
    declare title: string;
    declare imageUrl: string;
    declare price: number;
    declare description: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare CartItem?: CartItemAttributes;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        underscored: true,
    }
);
