import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GroupsModalSettingsComponent } from "../groups-modal-settings/groups-modal-settings.component";
import { GroupSettings } from "../../../classes/GroupSettings";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GroupsModalUserAddComponent } from "../groups-modal-user-add/groups-modal-user-add.component";

@Component({
    selector: "app-groups-main",
    templateUrl: "./groups-main.component.html",
    styleUrls: ["./groups-main.component.css"],
})
export class GroupsMainComponent implements OnInit, OnDestroy {
    constructor(
        private groupsDataService: GroupsDataService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {}
    private userGroupsDataSub: Subscription;
    private groupSelectionSub: Subscription;

    userGroupsData: GroupsPopulatedUsersModel[] = [];
    groupSelected = "";
    loading = true;
    apiError = "";

    getUserId() {
        return "5fc44bd3f35a902b3000803c"; // todo: get from token
    }

    ngOnInit() {
        this.loading = true;
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: GroupsPopulatedUsersModel[] }) => {
                this.userGroupsData = data.groups;
                if (data.message === "UPDATED") {
                    this.openSnackBar("Podatki uspešno posodobljeni!");
                } else if (data.message !== "OK") {
                    console.log(data.message);
                    this.openSnackBar(data.message);
                }
                this.loading = false;
            });
        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.groupSelected = data;
        });
        this.groupsDataService.getGroupsByUser();
        this.groupsDataService.getCurrentGroup();
    }

    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
        this.groupSelectionSub.unsubscribe();
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 5000,
        });
    }

    onGroupChange(idGroup: string) {
        this.groupsDataService.setCurrentGroup(idGroup);
    }

    openModalGroupSettings(data: { group: GroupsPopulatedUsersModel; userId: string }): void {
        let dialogRef = this.dialog.open(GroupsModalSettingsComponent, {
            width: "50rem",
            data: data,
        });

        dialogRef.afterClosed().subscribe((result?: GroupSettings) => {
            if (result && result.deleteGroup) {
                // TODO
                this.groupsDataService.deleteGroup(data.group._id);
            } else if (result && result.name) {
                this.groupsDataService.updateGroup({ name: result.name }, data.group._id);
            }
        });
    }

    openModalGroupUserAdd(group: GroupsPopulatedUsersModel): void {
        let dialogRef = this.dialog.open(GroupsModalUserAddComponent, {
            width: "50rem",
            data: group,
        });

        dialogRef.afterClosed().subscribe((userStr?: string) => {
            if (userStr) {
                console.log("Uporabnik za dodat: " + userStr);
                // todo: add option for adding admin to modal dialog
                this.groupsDataService.updateGroupAddUser({ mail: userStr }, group._id);
            }
        });
    }

    removeUserFromGroup(group: GroupsPopulatedUsersModel, userId: string): void {
        if (confirm("Res želite odstraniti tega uporabnika iz te skupine?")) {
            this.groupsDataService.updateGroupRemoveUser(userId, group._id);
        }
    }

    openModalGroupAdd(): void {}
}
