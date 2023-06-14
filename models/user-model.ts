import mongoose, { Schema, Types } from "mongoose";
import { ConstructedType } from "../types/common-types";

const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    cart: {
        type: {
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
        },
        required: true,
    },
});

const methods = {
    async addToCart(this: UserType, productId: string) {
        const cartItems = this.cart.items;
        const itemIndex = cartItems.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex >= 0) cartItems[itemIndex].quantity++;
        else cartItems.push({ productId: new Types.ObjectId(productId), quantity: 1 });
        await this.save();
    },

    async deleteFromCart(this: UserType, productId: string) {
        this.cart.items = this.cart.items.filter((item) => item.productId.toString() !== productId);
        await this.save();
    },

    async clearCart(this: UserType) {
        this.cart.items = [];
        await this.save();
    },
};

userSchema.methods.addToCart = methods.addToCart;
userSchema.methods.deleteFromCart = methods.deleteFromCart;
userSchema.methods.clearCart = methods.clearCart;

const User = mongoose.model("User", userSchema);

type UserType = ConstructedType<typeof User>;

export type UserData = UserType & typeof methods;

export default User;
