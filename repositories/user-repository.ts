import { User } from "../models";

export async function getUser(userId: number) {
    return await User.findByPk(userId);
}
