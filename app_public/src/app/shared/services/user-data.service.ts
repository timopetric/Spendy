import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../classes/user.model";
import { UserSettings } from "../classes/UserSettings";
import { Subject } from "rxjs";

const API_URL = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root",
})
export class UserDataService {
    private user: User = null;
    private userUpdated = new Subject<{ message: string; user: User }>();

    constructor(private http: HttpClient) {}

    getUserId() {
        return "5fc44bd3f35a902b3000803c"; // todo: get from token
    }

    getUserUpdateListener() {
        return this.userUpdated.asObservable();
    }

    private handleUpdateUserData(data, message?: string) {
        this.user = data as User;
        this.userUpdated.next({
            message: message || "OK",
            user: { ...this.user },
        });
    }
    private handleUpdateUserError(error) {
        this.userUpdated.next({
            message: error.error["message"],
            user: null,
        });
        return UserDataService.handleError(error);
    }

    getUser(online?: boolean) {
        if (online == true || this.user == null) {
            this.http.get(`${API_URL}/${this.getUserId()}`).subscribe(
                data => this.handleUpdateUserData(data),
                error => this.handleUpdateUserError(error)
            );
        } else {
            // return cached user data
            this.userUpdated.next({
                message: "OK",
                user: { ...this.user },
            });
        }
    }

    updateUser(data: UserSettings) {
        this.http.put(`${API_URL}/${this.getUserId()}`, data).subscribe(
            data => this.handleUpdateUserData(data, "UPDATED"),
            error => this.handleUpdateUserError(error)
        );
    }

    deleteUser(idUser: string) {
        return this.http
            .delete(`${API_URL}/${idUser}`)
            .toPromise()
            .then((response: any) => {
                this.handleUpdateUserData(response);
                return response;
            })
            .catch(UserDataService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        console.error(
            "There has been an error: " + error.error["message"],
            error.error["error"] || error.error.errmsg || error.message || error
        );
        return Promise.reject(error.error["message"] || error.error.errmsg || error.message || error);
    }
}
