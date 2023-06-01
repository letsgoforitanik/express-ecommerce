import { Cart } from "./cart-model";
import { CartItem } from "./cartitem-model";
import { Order } from "./order-model";
import { OrderItem } from "./orderitem-model";
import { Product } from "./product-model";
import { User } from "./user-model";

// define all relationships here =======
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

export { Product, User, Cart, CartItem, Order, OrderItem };
