import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GroupsModalSettingsComponent } from "../groups-modal-settings/groups-modal-settings.component";

@Component({
    selector: "app-groups-main",
    templateUrl: "./groups-main.component.html",
    styleUrls: ["./groups-main.component.css"],
})
export class GroupsMainComponent implements OnInit, OnDestroy {
    constructor(private groupsDataService: GroupsDataService, public dialog: MatDialog) {}
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

    onGroupChange(idGroup: string) {
        this.groupsDataService.setCurrentGroup(idGroup);
    }

    openModalGroupSettings(group: GroupsPopulatedUsersModel): void {
        let dialogRef = this.dialog.open(GroupsModalSettingsComponent, {
            width: "50rem",
            data: group,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("The dialog was closed");
            this.userGroupsData = this.userGroupsData.filter(groupTmp => groupTmp !== group);
        });
    }

    openModalGroupUserAdd(group: GroupsPopulatedUsersModel): void {}

    removeUserFromGroup(group: GroupsPopulatedUsersModel, userId: string): void {
        console.log(group._id + ", " + userId);
        console.log(group);
    }

    openModalGroupAdd(): void {}
}
