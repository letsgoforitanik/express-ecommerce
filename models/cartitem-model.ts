import { DataTypes, Model } from "sequelize";
import sequelize from "../helpers/sequelize";
import { CartItemAttributes } from "../types";

export class CartItem extends Model<CartItemAttributes> implements CartItemAttributes {
    declare readonly id: number;
    declare quantity: number;
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        underscored: true,
    }
);
