import { DataTypes, Model } from "sequelize";
import { OrderItemAttributes } from "../types";
import sequelize from "../helpers/sequelize";

export class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {
    declare readonly id: number;
    declare quantity: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

OrderItem.init(
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
    { sequelize: sequelize }
);
