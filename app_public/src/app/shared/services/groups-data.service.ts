import { Injectable } from "@angular/core";
import { Group } from "../classes/group";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const API_URL_GROUPS = environment.apiUrl + "/groups";
const API_URL_USERS = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root",
})
export class GroupsDataService {
    private groupsUpdated = new Subject<{ message: string; groups: Group[] }>();
    private groupSelectionUpdate = new Subject<string>();
    constructor(private http: HttpClient) {}

    private groups: Group[] = null;
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
    getGroupsByUser() {
        let url = `${API_URL_USERS}/${this.getUserId()}/groups`;
        this.http.get(url).subscribe(
            data => this.handleUpdateUserGroupsData(data),
            error => this.handleUpdateUserGroupsError(error)
        );
    }
    private handleUpdateUserGroupsData(data, message?: string) {
        this.groups = data as Group[];
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

    private static handleError(error: any): Promise<any> {
        console.error(
            "There has been an error: " + error.error["message"],
            error.error["error"] || error.error.errmsg || error.message || error
        );
        return Promise.reject(error.error["message"] || error.error.errmsg || error.message || error);
    }
}
