import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GroupsModalSettingsComponent } from "../groups-modal-settings/groups-modal-settings.component";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { FormControl, Validators } from "@angular/forms";
import { ConnectionService } from "../../../services/connection.service";

@Component({
    selector: "app-groups-modal-user-add",
    templateUrl: "./groups-modal-user-add.component.html",
    styleUrls: ["./groups-modal-user-add.component.css"],
})
export class GroupsModalUserAddComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<GroupsModalSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public group: GroupsPopulatedUsersModel,
        private connectionService: ConnectionService
    ) {}

    isOnline(): boolean {
        return this.connectionService.isOnline;
    }

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
