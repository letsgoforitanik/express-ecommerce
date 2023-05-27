import { Model, DataTypes } from "sequelize";
import sequelize from "../helpers/sequelize";

export interface ProductAttributes {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Product extends Model implements ProductAttributes {
    declare id: number;
    declare title: string;
    declare imageUrl: string;
    declare price: number;
    declare description: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
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
    { sequelize }
);
