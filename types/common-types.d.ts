import { Model } from "mongoose";

type ConstructedType<Type> = Type extends Model<any, any, any, any, infer X> ? X : never;
