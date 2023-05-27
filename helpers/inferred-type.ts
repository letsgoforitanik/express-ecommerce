import { DataTypes, ModelAttributes } from "sequelize";

export type Attributes = {
    [key: string]: { type: any };
};

type JsType<T> = T extends typeof DataTypes.NUMBER
    ? number
    : T extends typeof DataTypes.TEXT
    ? string
    : T extends typeof DataTypes.STRING
    ? string
    : T extends typeof DataTypes.BOOLEAN
    ? boolean
    : T extends typeof DataTypes.DATE
    ? Date
    : T;

export type InferredType<Type extends Attributes> = {
    [Property in keyof Type]: JsType<Type[Property]["type"]>;
};
