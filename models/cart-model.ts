import { DataTypes, FindOptions, Model } from "sequelize";
import sequelize from "../helpers/sequelize";
import { Product } from "./product-model";
import { AddOptions, HasMany, ManyInstanceOptions } from "../types/common-types";
import { ProductAttributes, CartAttributes, CartItemAttributes } from "../types";

export class Cart extends Model<CartAttributes> implements CartAttributes, HasMany<"Products", Product> {
    declare readonly id: number;
    ////////////////////////////// Products
    declare getProducts: (options?: FindOptions<ProductAttributes>) => Promise<Product[]>;
    declare countProducts: () => Promise<number>;
    declare hasProducts: (models: ManyInstanceOptions<Product>) => Promise<boolean>;
    declare setProducts: (models: ManyInstanceOptions<Product>) => Promise<any>;
    declare removeProducts: (models: ManyInstanceOptions<Product>) => Promise<any>;
    declare addProducts: (models: ManyInstanceOptions<Product>, options?: AddOptions<CartItemAttributes>) => Promise<any>;
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    },
    {
        sequelize: sequelize,
        underscored: true,
    }
);
