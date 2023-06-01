import { DataTypes, FindOptions, Model } from "sequelize";

import sequelize from "../helpers/sequelize";
import { CartAttributes, OrderAttributes, ProductAttributes, ProductCreationDto, UserAttributes } from "../types";
import { AddOptions, HasMany, HasOne, ManyInstanceOptions, OneInstanceOptions } from "../types/common-types";
import { Cart, Order, Product } from ".";

export class User
    extends Model<UserAttributes>
    implements UserAttributes, HasMany<"Products", Product>, HasOne<"Cart", Cart>, HasMany<"Orders", Order>
{
    declare readonly id: number;
    declare name: string;
    declare email: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    ///////////////////////////// Products
    declare getProducts: (options?: FindOptions<ProductAttributes>) => Promise<Product[]>;
    declare countProducts: () => Promise<number>;
    declare hasProducts: (models: ManyInstanceOptions<Product>) => Promise<boolean>;
    declare setProducts: (models: ManyInstanceOptions<Product>) => Promise<any>;
    declare removeProducts: (models: ManyInstanceOptions<Product>) => Promise<any>;
    declare addProducts: (models: ManyInstanceOptions<Product>, options?: AddOptions<ProductAttributes>) => Promise<any>;
    declare createProduct: (data: ProductCreationDto) => Promise<Product>;
    //////////////////////////// Cart
    declare createCart: (data?: CartAttributes) => Promise<Cart>;
    declare setCart: (associatedInstance: OneInstanceOptions<Cart>) => Promise<any>;
    declare getCart: () => Promise<Cart>;
    /////////////////////////// Orders
    declare getOrders: (options?: FindOptions<OrderAttributes>) => Promise<Order[]>;
    declare countOrders: () => Promise<number>;
    declare hasOrders: (targetInstances: ManyInstanceOptions<Order>) => Promise<boolean>;
    declare setOrders: (targetInstances: ManyInstanceOptions<Order>) => Promise<any>;
    declare removeOrders: (targetInstances: ManyInstanceOptions<Order>) => Promise<any>;
    declare addOrders: (targetInstances: ManyInstanceOptions<Order>) => Promise<any>;
    declare createOrder: () => Promise<Order>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize: sequelize }
);

export default User;
