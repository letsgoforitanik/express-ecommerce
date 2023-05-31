import { Attributes, FindOptions, Model } from "sequelize/types/model";

export interface TimestampAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

interface SingularMethods<T> {
    create: (data: unknown) => Promise<T>;
    set: (associatedInstance: OneInstanceOptions<T>) => Promise<any>;
    get: () => Promise<T>;
}

interface PluralMethods<T extends Model> {
    get: (options?: FindOptions<Attributes<T>>) => Promise<T[]>;
    count: () => Promise<number>;
    has: (targetInstances: ManyInstanceOptions<T>) => Promise<boolean>;
    set: (targetInstances: ManyInstanceOptions<T>) => Promise<any>;
    remove: (targetInstances: ManyInstanceOptions<T>) => Promise<any>;
    add: <U>(targetInstances: ManyInstanceOptions<T>, options?: AddOptions<U>) => Promise<any>;
}

type HasOne<TLiteral extends string, Type extends Model> = {
    [Property in keyof SingularMethods<Type> as `${string & Property}${TLiteral}`]: SingularMethods<Type>[Property];
};

type HasMany<TLiteral extends string, Type extends Model> = {
    [Property in keyof PluralMethods<Type> as `${string & Property}${TLiteral}`]: PluralMethods<Type>[Property];
};

type ThroughOptions<Type> = {
    [Property in keyof Type]?: Type[Property];
};

interface AddOptions<T> {
    through?: ThroughOptions<T>;
}

type ManyInstanceOptions<T> = T | T[] | string | string[] | number | number[];
type OneInstanceOptions<T> = T | string | number;
