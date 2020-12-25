import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";

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

    onNoClick(): void {
        this.dialogRef.close();
    }
}
