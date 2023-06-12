import { User } from "../models-mongo/user-model";

export async function getUser(userId: string) {
    return await User.findById(userId);
}
