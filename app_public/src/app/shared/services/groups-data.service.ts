import { Injectable } from "@angular/core";
import { Group } from "../classes/group";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { GroupsPopulatedUsersModel } from "../classes/groups-populated-users.model";

const API_URL_GROUPS = environment.apiUrl + "/groups";
const API_URL_USERS = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root",
})
export class GroupsDataService {
    private groupsUpdated = new Subject<{ message: string; groups: GroupsPopulatedUsersModel[] }>();
    private groupSelectionUpdate = new Subject<string>();
    constructor(private http: HttpClient) {}

    private groups: GroupsPopulatedUsersModel[] = null;
    private groupSelected = "";

    getUserId() {
        return "5fc44bd3f35a902b3000803c"; // todo: get from token
    }

    getGroupSelectionUpdateListener() {
        return this.groupSelectionUpdate.asObservable();
    }
    getUserGroupsUpdateListener() {
        return this.groupsUpdated.asObservable();
    }

    // --------- get all groups of user ---------
    getGroupsByUser(online?: boolean) {
        // todo: add update timer - when 1 minute is over get new data from api
        if (online == true || this.groups == null) {
            let url = `${API_URL_USERS}/${this.getUserId()}/groups?populate=userIds`;
            this.http.get(url).subscribe(
                data => this.handleUpdateUserGroupsData(data),
                error => this.handleUpdateUserGroupsError(error)
            );
        } else {
            this.groupsUpdated.next({
                message: "OK",
                groups: [...this.groups],
            });
        }
    }
    private handleUpdateUserGroupsData(data, message?: string) {
        this.groups = data as GroupsPopulatedUsersModel[];
        this.groupsUpdated.next({
            message: message || "OK",
            groups: [...this.groups],
        });
        if (this.groupSelected === "" && this.groups.length > 0) {
            this.setCurrentGroup(this.groups[0]._id);
        }
    }
    private handleUpdateUserGroupsError(error) {
        this.groupsUpdated.next({
            message: error.error["message"],
            groups: [],
        });
        return GroupsDataService.handleError(error);
    }

    // --------- get current group selection ---------
    setCurrentGroup(idGroup: string) {
        this.groupSelected = idGroup;
        this.groupSelectionUpdate.next(idGroup);
    }
    getCurrentGroup() {
        this.groupSelectionUpdate.next(this.groupSelected);
    }

    // --------- update group -----------
    updateGroup(data: { name: string }, idGroup: string) {
        this.http.put(`${API_URL_GROUPS}/${idGroup}`, data).subscribe(
            data => this.handleUpdateGroupData(data, "UPDATED"),
            error => this.handleUpdateGroupError(error)
        );
    }
    updateGroupAddUser(data: { mail: string }, idGroup: string) {
        this.http.post(`${API_URL_GROUPS}/${idGroup}/users`, data).subscribe(
            data => this.handleUpdateGroupData(data, "UPDATED"),
            error => this.handleUpdateGroupError(error)
        );
    }
    private handleUpdateGroupData(data, message?: string) {
        let groupNew = data as GroupsPopulatedUsersModel;
        // delete old group from groups
        this.groups = this.groups.filter(group => group._id !== groupNew._id);
        // add new group to groups
        this.groups = [...this.groups, groupNew];
        this.groupsUpdated.next({
            message: message || "OK",
            groups: [...this.groups],
        });
        this.setCurrentGroup(groupNew._id);
    }
    private handleUpdateGroupError(error) {
        this.groupsUpdated.next({
            message: error.error["message"],
            groups: [...this.groups],
        });
        return GroupsDataService.handleError(error);
    }

    private static handleError(error: any): Promise<any> {
        console.error(
            "There has been an error: " + error.error["message"],
            error.error["error"] || error.error.errmsg || error.message || error
        );
        return Promise.reject(error.error["message"] || error.error.errmsg || error.message || error);
    }
}
