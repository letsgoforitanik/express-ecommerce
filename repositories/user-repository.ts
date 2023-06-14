import { User } from "../models";
import { UserData } from "../models/user-model";

export async function createUser(attributes: Partial<UserData>) {
    return await User.create(attributes);
}

export async function getUser(userId: string) {
    return (await User.findById(userId)) as UserData;
}
