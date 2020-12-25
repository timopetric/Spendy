export class GroupSettings {
    private _name: string;
    private _deleteGroup: boolean;

    constructor(name: string, deleteGroup: boolean) {
        this._name = name;
        this._deleteGroup = deleteGroup;
    }

    get name(): string {
        return this._name;
    }

    get deleteGroup(): boolean {
        return this._deleteGroup;
    }
}
