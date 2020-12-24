import { Component, OnInit } from "@angular/core";
import { GroupsDataService } from "../../services/groups-data.service";
import { Group } from "../../classes/group";
import { Subscription } from "rxjs";

@Component({
    selector: "app-groups",
    templateUrl: "./groups.component.html",
    styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {
    constructor(private groupsDataService: GroupsDataService) {}
    private userGroupsDataSub: Subscription;

    loading = true;
    apiError = "";
    userGroupsData: Group[] = [];

    ngOnInit() {
        this.loading = true;
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: Group[] }) => {
                this.userGroupsData = data.groups;
                // console.log(data.groups);
            });
        this.groupsDataService.getGroupsByUser();
    }
}
