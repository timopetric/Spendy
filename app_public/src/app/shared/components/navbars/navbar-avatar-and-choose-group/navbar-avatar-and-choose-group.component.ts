import { Component, OnDestroy, OnInit } from "@angular/core";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";

@Component({
    selector: "app-navbar-avatar-and-choose-group",
    templateUrl: "./navbar-avatar-and-choose-group.component.html",
    styleUrls: ["./navbar-avatar-and-choose-group.component.css"],
})
export class NavbarAvatarAndChooseGroupComponent implements OnInit, OnDestroy {
    constructor(private groupsDataService: GroupsDataService) {}
    private userGroupsDataSub: Subscription;
    private groupSelectionSub: Subscription;

    userGroupsData: GroupsPopulatedUsersModel[] = [];
    groupSelected = "";
    loading = true;
    apiError = "";

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
}
