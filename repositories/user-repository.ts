import { User } from "../models/user-model";

export async function getUser(userId: string) {
    return await User.findById(userId);
}
