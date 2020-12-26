import { Group } from "./group";

export class UserTokenData {
    _id: string;
    username: string;
    mail: string;
    name: string;
    surname: string;

    constructor(id: string, username: string, mail: string, name: string, surname: string) {
        this._id = id;
        this.username = username;
        this.mail = mail;
        this.name = name;
        this.surname = surname;
    }
}
