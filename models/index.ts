import { Cart } from "./cart-model";
import { CartItem } from "./cartitem-model";
import { Product } from "./product-model";
import { User } from "./user-model";

// define all relationships here =======
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

export { Product, User, Cart };
