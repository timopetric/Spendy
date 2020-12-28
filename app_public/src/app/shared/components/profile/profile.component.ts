import { Component, OnInit, setTestabilityGetter } from "@angular/core";
import { UporabnikService } from "../../services/uporabnik.service";
import { HttpClient } from "@angular/common/http";
import { count } from "rxjs/operators";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { UserDataService } from "../../services/user-data.service";
import { Subscription } from "rxjs";
import { User } from "../../classes/user.model";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: [
        "./profile.component.css",
        "../../../../assets/stylesheets/style-profil.css",
        "../../../../assets/stylesheets/style.css",
    ],
})
export class ProfileComponent implements OnInit {
    constructor(
        private uporabnikService: UporabnikService,
        private authenticationService: AuthenticationService,
        private usmerjevalnik: Router,
        private userDataService: UserDataService
    ) {}
    // constructor() { }

    private userDataSub: Subscription;
    public uporabnik: Uporabnik;
    userData: User = new User();
    userGroupNumber = 0;

    // @ts-ignore
    private pridobiUporabnika(): void {
        this.uporabnikService.pridobiUporabnika("Metka").then(najdenUporabnik => {
            let stevilo = 0;
            this.uporabnik = najdenUporabnik;
            for (let i = 0; i < this.uporabnik.groupIds.length; i++) {
                stevilo++;
            }
            this.uporabnik.stSkupin = stevilo;
        });
    }

    private pridobiStSkupin(): void {
        let count: number = 0;
        // for (let i: number = 0; i < this.uporabnik.balance; i++) {
        //     count++;
        // }
        this.uporabnik.stSkupin = count;
    }

    private gaVrzemVen(): void {
        if (!this.authenticationService.jePrijavljen()) {
            this.usmerjevalnik.navigateByUrl("/login");
        }
    }

    ngOnInit(): void {
        // this.pridobiUporabnika();
        this.gaVrzemVen();
        this.userDataSub = this.userDataService
            .getUserUpdateListener()
            .subscribe((user: { message: string; user: User }) => {
                this.userData = user.user;
                this.userGroupNumber = this.userData.groupIds.length;
                this.updateFieldsAndSaveUser(user);
            });
        this.userDataService.getUser();
        // this.pridobiStSkupin();
    }

    private updateFieldsAndSaveUser(data: { message: string; user: User }) {
        if (data.user !== null) {
            this.userData = data.user;
        } else {
            console.log("Can not find user");
            // this.apiError = data.message;
            // this.loading = true;
        }
    }
}

export class Uporabnik {
    _id: string;
    username: string;
    name: string;
    surname: string;
    mail: string;
    pass: string;
    balance: number;
    stSkupin: number;
    groupIds: any[];
}
