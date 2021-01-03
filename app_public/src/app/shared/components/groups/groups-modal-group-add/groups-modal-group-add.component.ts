import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";
import { ConnectionService } from "../../../services/connection.service";

@Component({
    selector: "app-groups-modal-group-add",
    templateUrl: "./groups-modal-group-add.component.html",
    styleUrls: ["./groups-modal-group-add.component.css"],
})
export class GroupsModalGroupAddComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<GroupsModalGroupAddComponent>,
        private connectionService: ConnectionService
    ) {}

    isOnline(): boolean {
        return this.connectionService.isOnline;
    }

    ngOnInit() {}

    public dataForm = {
        groupName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    };
    groupNameError = "Ime skupine mora biti dolgo med 3 in 20 znakov";

    addUser() {
        console.log("UPDATE");
        this.dialogRef.close(this.dataForm.groupName.value);
    }
}
