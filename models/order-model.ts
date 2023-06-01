import { DataTypes, FindOptions, Model } from "sequelize";
import { OrderAttributes, OrderItemAttributes, ProductAttributes } from "../types";
import sequelize from "../helpers/sequelize";
import { AddOptions, HasMany, ManyInstanceOptions } from "../types/common-types";
import { Product } from ".";

export class Order extends Model<OrderAttributes> implements OrderAttributes, HasMany<"Products", Product> {
    declare readonly id: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    /////////////////////////// Products
    declare getProducts: (options?: FindOptions<ProductAttributes>) => Promise<Product[]>;
    declare countProducts: () => Promise<number>;
    declare hasProducts: (models: ManyInstanceOptions<Product>) => Promise<boolean>;
    declare setProducts: (models: ManyInstanceOptions<Product>) => Promise<any>;
    declare removeProducts: (models: ManyInstanceOptions<Product>) => Promise<any>;
    declare addProducts: (models: ManyInstanceOptions<Product>, options?: AddOptions<OrderItemAttributes>) => Promise<any>;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    },
    { sequelize: sequelize }
);
