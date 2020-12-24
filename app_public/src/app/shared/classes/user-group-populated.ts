import { Group } from "./group";

export class UserGroupPopulated {
    _id: string;
    groupIds: Group[];
    username: string;
    name: string;
    surname: string;
    mail: string;
    balance: number;
}
