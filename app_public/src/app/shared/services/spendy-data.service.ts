import { Injectable, OnInit } from "@angular/core";
import { User } from "../classes/user.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root",
})
export class SpendyDataService implements OnInit {
    constructor(private http: HttpClient) {}
    ngOnInit() {}
}
