import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GroupsModalSettingsComponent } from "../groups-modal-settings/groups-modal-settings.component";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-groups-modal-user-add",
    templateUrl: "./groups-modal-user-add.component.html",
    styleUrls: ["./groups-modal-user-add.component.css"],
})
export class GroupsModalUserAddComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<GroupsModalSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public group: GroupsPopulatedUsersModel
    ) {}

    ngOnInit() {}

    public dataForm = {
        mail: new FormControl("", [Validators.required, Validators.email]),
    };
    mailError = "Email mora biti veljavne oblike in sestavljen iz samih malih črk";

    addUser() {
        console.log("UPDATE");
        this.dialogRef.close(this.dataForm.mail.value);
    }
}
