import { Injectable, OnInit } from "@angular/core";
import { User } from "../classes/user.model";
import { UserLogin } from "../classes/user-login";
import { UserSignup } from "../classes/user-signup";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

import { AuthenticationResult } from "../classes/authentication-result";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: "root",
})
export class SpendyDataService implements OnInit {
    constructor(private http: HttpClient) {}
    ngOnInit() {}

    public getDropDatabase(): Promise<any> {
        const url: string = `${API_URL}/db/drop`;
        return this.http
            .get(url)
            .toPromise()
            .then(odgovor => odgovor)
            .catch(napaka => Promise.reject(napaka.error || napaka.message || napaka));
    }
    public getImportDatabase(): Promise<any> {
        const url: string = `${API_URL}/db/import`;
        return this.http
            .get(url)
            .toPromise()
            .then(odgovor => odgovor)
            .catch(napaka => Promise.reject(napaka.error || napaka.message || napaka));
    }

    public prijava(userLogin: UserLogin): Promise<AuthenticationResult> {
        return this.avtentikacijaLogin("prijava", userLogin);
    }

    public registracija(userSignup: UserSignup): Promise<AuthenticationResult> {
        return this.avtentikacijaSignup("registracija", userSignup);
    }

    private avtentikacija(urlNaslov: string, user: User): Promise<AuthenticationResult> {
        const url: string = `${API_URL}/${urlNaslov}`;
        return this.http
            .post(url, user)
            .toPromise()
            .then(rezultat => rezultat as AuthenticationResult)
            .catch(this.obdelajNapako);
    }

    private avtentikacijaLogin(urlNaslov: string, userLogin: UserLogin): Promise<AuthenticationResult> {
        const url: string = `${API_URL}/${urlNaslov}`;
        return this.http
            .post(url, userLogin)
            .toPromise()
            .then(rezultat => rezultat as AuthenticationResult)
            .catch(this.obdelajNapako);
    }

    private avtentikacijaSignup(urlNaslov: string, userSignup: UserSignup): Promise<AuthenticationResult> {
        const url: string = `${API_URL}/${urlNaslov}`;
        return this.http
            .post(url, userSignup)
            .toPromise()
            .then(rezultat => rezultat as AuthenticationResult)
            .catch(this.obdelajNapako);
    }

    private obdelajNapako(napaka: any): Promise<any> {
        console.error(
            "Prišlo je do napake čudne",
            napaka.error["sporočilo"] || napaka.error.errmsg || napaka.message || napaka
        );
        return Promise.reject(napaka.error["sporočilo"] || napaka.error.errmsg || napaka.message || napaka);
    }
}
