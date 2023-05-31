import { TimestampAttributes } from "./common-types";

////////////////////// Product

interface ProductAttributes extends TimestampAttributes {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
}

type ProductCreationDto = Omit<ProductAttributes, "id" | "createdAt" | "updatedAt">;
type UserProductCreationDto = Omit<ProductCreationDto, "userId">;
type ProductUpdationDto = Partial<ProductCreationDto>;

////////////////////// User

interface UserAttributes extends TimestampAttributes {
    id: number;
    name: string;
    email: string;
}

///////////////////// Cart

interface CartAttributes extends TimestampAttributes {
    id: number;
}

////////////////////// Cart Item

interface CartItemAttributes extends TimestampAttributes {
    id: number;
    quantity: number;
}
