import mongoose, { Schema } from "mongoose";
import { ConstructedType } from "../types/common-types";

const productSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const Product = mongoose.model("Product", productSchema);

export type ProductData = ConstructedType<typeof Product>;

export default Product;
