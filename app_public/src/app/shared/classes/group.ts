export class Group {
    private __id: string;
    private _userIds: string[];
    private _adminIds: string[];
    private _expenses: string[];
    private _name: string;
    private _balance: number;

    get _id(): string {
        return this.__id;
    }

    set _id(value: string) {
        this.__id = value;
    }

    get userIds(): string[] {
        return this._userIds;
    }

    set userIds(value: string[]) {
        this._userIds = value;
    }

    get adminIds(): string[] {
        return this._adminIds;
    }

    set adminIds(value: string[]) {
        this._adminIds = value;
    }

    get expenses(): string[] {
        return this._expenses;
    }

    set expenses(value: string[]) {
        this._expenses = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }
}
