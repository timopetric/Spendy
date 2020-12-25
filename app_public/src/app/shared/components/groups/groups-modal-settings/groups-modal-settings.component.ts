import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { FormControl, Validators } from "@angular/forms";
import { GroupSettings } from "../../../classes/GroupSettings";

@Component({
    selector: "app-groups-modal-settings",
    templateUrl: "./groups-modal-settings.component.html",
    styleUrls: ["./groups-modal-settings.component.css"],
})
export class GroupsModalSettingsComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<GroupsModalSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public group: GroupsPopulatedUsersModel
    ) {}

    ngOnInit() {}

    public dataForm = {
        name: new FormControl(this.group.name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
        ]),
        // limit: new FormControl(this.group.balance, [Validators.required, Validators.min(0)]),
    };
    nameError = "Ime mora biti dolgo med 3 in 25 znakov";
    // limitError = "Limit mora biti nenegativen";

    deleteGroup() {
        console.log("DELETE");

        if (confirm("Res želite izbrisati to skupino?")) {
            console.log("yes, delete " + this.group.name);
            this.dialogRef.close(new GroupSettings(null, true));
        }
    }

    updateGroup() {
        console.log("UPDATE");
        this.dialogRef.close(new GroupSettings(this.dataForm.name.value, false));
    }
}
