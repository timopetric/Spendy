import { Component, OnDestroy, OnInit } from "@angular/core";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { GroupsPopulatedUsersModel } from "../../../classes/groups-populated-users.model";
import { AuthenticationService } from "../../../services/authentication.service";
import { HistoryService } from "../../../services/history.service";
import { UserDataService } from "../../../services/user-data.service";

@Component({
    selector: "app-navbar-avatar-and-choose-group",
    templateUrl: "./navbar-avatar-and-choose-group.component.html",
    styleUrls: ["./navbar-avatar-and-choose-group.component.css"],
})
export class NavbarAvatarAndChooseGroupComponent implements OnInit, OnDestroy {
    constructor(
        private groupsDataService: GroupsDataService,
        private userDataService: UserDataService,
        private authenticationService: AuthenticationService,
        private historyService: HistoryService
    ) {}
    private userGroupsDataSub: Subscription;
    private groupSelectionSub: Subscription;

    userGroupsData: GroupsPopulatedUsersModel[] = [];
    username: string = "";
    groupSelected = "";
    loading = true;
    apiError = "";

    getUsernameFromToken() {
        let { username } = this.authenticationService.vrniTrenutnegaUporabnika();
        return username;
    }

    clearSavedData() {
        this.userGroupsData = [];
        this.username = "";
        this.groupSelected = "";
        this.apiError = "";
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

        this.username = this.getUsernameFromToken() || "";
    }

    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
        this.groupSelectionSub.unsubscribe();
    }

    onGroupChange(idGroup: string) {
        this.groupsDataService.setCurrentGroup(idGroup);
    }

    public odjava(): void {
        this.clearSavedData();
        this.groupsDataService.clearSavedData();
        this.userDataService.clearSavedData();
        this.authenticationService.odjava();
    }
}
