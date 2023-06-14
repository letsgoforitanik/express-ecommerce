import mongoose, { Schema } from "mongoose";
import { ConstructedType } from "../types/common-types";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            quantity: {
                type: Schema.Types.Number,
                required: true,
            },
        },
    ],
});

const Order = mongoose.model("Order", orderSchema);

export type OrderData = ConstructedType<typeof Order>;

export default Order;
