import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../classes/user.model";
import { UserGroupPopulated } from "../classes/user-group-populated";

const API_URL = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root",
})
export class UserDataService implements OnInit {
    constructor(private http: HttpClient) {
        this.getUserGroupPopulatedData().then(userPopulated => {
            this.userPopulated = userPopulated;
        });
    }

    userId = "5fe12a172732e405383395e6"; // todo: get from token

    public userPopulated: UserGroupPopulated = new UserGroupPopulated();
    numOfGroups = 0;
    public user: User = new User();

    ngOnInit() {}

    public getUserGroupPopulatedData() {
        return this.http
            .get(`${API_URL}/${this.userId}`)
            .toPromise()
            .then((response: any) => {
                this.userPopulated = response as UserGroupPopulated;
                this.numOfGroups = this.userPopulated.groupIds.length;
                return response as UserGroupPopulated;
            })
            .catch(UserDataService.obdelajNapako);
    }

    public updateUserSettings(data) {
        return this.http
            .put(`${API_URL}/${this.userId}`, data)
            .toPromise()
            .then((response: any) => {
                this.user = response as User;
                console.log(this.user);
            })
            .then(() => {
                // update current user data
                return this.getUserGroupPopulatedData().then(userPopulated => {
                    this.userPopulated = userPopulated;
                    this.numOfGroups = this.userPopulated.groupIds.length;
                    return this.userPopulated;
                });
            })
            .catch(UserDataService.obdelajNapako);
    }

    public deleteUser(idUser: string) {
        return this.http
            .delete(`${API_URL}/${idUser}`)
            .toPromise()
            .then((response: any) => {
                return response;
            })
            .catch(UserDataService.obdelajNapako);
    }

    private static obdelajNapako(napaka: any): Promise<any> {
        console.error(
            "There has been an error",
            napaka.error["message"] || napaka.error.errmsg || napaka.message || napaka
        );
        return Promise.reject(napaka.error["message"] || napaka.error.errmsg || napaka.message || napaka);
    }
}
