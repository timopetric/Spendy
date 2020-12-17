import { Injectable, OnInit } from "@angular/core";
import { User } from "../classes/user.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: "root",
})
export class SpendyDataService {
    constructor(private http: HttpClient) {}
    public getExpenses(skupinaId): any {
        return this.http
            .get(API_URL + "/" + skupinaId)
            .toPromise()
            .then((response: any) => {
                //TODO
            });
    }
}
