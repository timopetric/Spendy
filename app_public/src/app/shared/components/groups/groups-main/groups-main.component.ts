import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GroupsModalSettingsComponent } from "../groups-modal-settings/groups-modal-settings.component";
import { GroupSettings } from "../../../classes/GroupSettings";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GroupsModalUserAddComponent } from "../groups-modal-user-add/groups-modal-user-add.component";
import { GroupsModalGroupAddComponent } from "../groups-modal-group-add/groups-modal-group-add.component";
import { AuthenticationService } from "../../../services/authentication.service";
import { Title } from "@angular/platform-browser";

const MAX_GROUP_COUNT = 10;

@Component({
    selector: "app-groups-main",
    templateUrl: "./groups-main.component.html",
    styleUrls: ["./groups-main.component.css"],
})
export class GroupsMainComponent implements OnInit, OnDestroy {
    constructor(
        private groupsDataService: GroupsDataService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private authenticationService: AuthenticationService,
        private titleService: Title
    ) {
        this.titleService.setTitle("Skupine");
    }
    private userGroupsDataSub: Subscription;
    private groupSelectionSub: Subscription;

    userGroupsData: GroupsPopulatedUsersModel[] = [];
    groupSelected = "";
    loading = true;
    apiError = "";
    groupCount = 0;
    MAX_GROUP_COUNT = 10;

    getUserId() {
        let { _id } = this.authenticationService.vrniTrenutnegaUporabnika();
        return _id;
    }

    ngOnInit() {
        this.loading = true;
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: GroupsPopulatedUsersModel[] }) => {
                // console.log("###############$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                // console.log(data);
                this.userGroupsData = data.groups;
                this.groupCount = data.groups.length;
                if (data.message === "OK") {
                    this.loading = false;
                    // this.openSnackBar("Podatki uspešno pridobljeni!");
                } else if (data.message === "UPDATED") {
                    this.loading = false;
                    this.openSnackBar("Podatki uspešno posodobljeni!");
                } else if (data.message !== "OK") {
                    // console.log(data.message);
                    if (data.message) this.openSnackBar(data.message);
                }
                // this.loading = false;
            });
        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.groupSelected = data;
        });

        // navbar avatar comp. calls for old data - with (true) we load new group data on init
        this.groupsDataService.getGroupsByUser(true);
        // this.groupsDataService.getCurrentGroup();
    }

    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
        this.groupSelectionSub.unsubscribe();
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 10000,
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

    openModalGroupAdd() {
        let dialogRef = this.dialog.open(GroupsModalGroupAddComponent, {
            width: "50rem",
        });

        dialogRef.afterClosed().subscribe((groupName?: string) => {
            if (groupName) {
                this.groupsDataService.addGroup({ idUser: this.getUserId(), groupName: groupName });
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
}
