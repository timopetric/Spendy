export class User {
    private __id: string;
    private _groupIds: string[];
    private _username: string;
    private _name: string;
    private _surname: string;
    private _mail: string;
    private _balance: number;

    get _id(): string {
        return this.__id;
    }

    set _id(value: string) {
        this.__id = value;
    }

    get groupIds(): string[] {
        return this._groupIds;
    }

    set groupIds(value: string[]) {
        this._groupIds = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    get mail(): string {
        return this._mail;
    }

    set mail(value: string) {
        this._mail = value;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }
}
