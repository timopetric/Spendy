import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { FormControl, Validators } from "@angular/forms";
import { GroupSettings } from "../../../classes/GroupSettings";
import { ConnectionService } from "../../../services/connection.service";

@Component({
    selector: "app-groups-modal-settings",
    templateUrl: "./groups-modal-settings.component.html",
    styleUrls: ["./groups-modal-settings.component.css"],
})
export class GroupsModalSettingsComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<GroupsModalSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { group: GroupsPopulatedUsersModel; userId: string },
        private connectionService: ConnectionService
    ) {}

    isOnline(): boolean {
        return this.connectionService.isOnline;
    }

    ngOnInit() {}

    public dataForm = {
        name: new FormControl(this.data.group.name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
        ]),
        // limit: new FormControl(this.group.balance, [Validators.required, Validators.min(0)]),
    };
    nameError =
        "Ime mora biti dolgo med 3 in 30 znakov, sestavljeno iz velikih, malih črk ter številk 0 do 9, ter znaka . in @";
    // limitError = "Limit mora biti nenegativen";

    deleteGroup() {
        console.log("DELETE");

        if (confirm("Res želite izbrisati to skupino?")) {
            // console.log("yes, delete " + this.data.group.name);
            this.dialogRef.close(new GroupSettings(null, true));
        }
    }

    updateGroup() {
        console.log("UPDATE");
        this.dialogRef.close(new GroupSettings(this.dataForm.name.value, false));
    }
}
