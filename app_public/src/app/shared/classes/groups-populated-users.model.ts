import { UserBareModel } from "./user-bare.model";

export class GroupsPopulatedUsersModel {
    _id: string;
    userIds: UserBareModel[];
    adminIds: string[];
    expenses: string[];
    name: string;
    balance: number;
}
