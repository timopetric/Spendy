import { Component, OnInit, setTestabilityGetter } from "@angular/core";
import { UporabnikService } from "../../services/uporabnik.service";
import { HttpClient } from "@angular/common/http";
import { count } from "rxjs/operators";

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
    constructor(private uporabnikService: UporabnikService) {}
    // constructor() { }

    public uporabnik: Uporabnik;

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

    ngOnInit(): void {
        this.pridobiUporabnika();
        // this.pridobiStSkupin();
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
