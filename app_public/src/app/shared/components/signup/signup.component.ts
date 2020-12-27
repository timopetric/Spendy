import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { HistoryService } from "../../services/history.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: [
        "./signup.component.css",
        "../../../../assets/stylesheets/style.css",
        "../../../../assets/stylesheets/style-profil.css",
    ],
})
export class SignupComponent implements OnInit {
    public napakaNaObrazcu = "";

    public prijavniPodatki = {
        name: "",
        surname: "",
        mail: "",
        pass: "",
        passAgain: "",
        balance: 0,
        username: "",
    };

    // public vsebinaStrani = {
    //     glava: {
    //         naslov: "Kreiranje novega uporabniškega računa",
    //         podnaslov: ""
    //     },
    //     stranskaOrodnaVrstica: ""
    // }

    constructor(
        private usmerjevalnik: Router,
        private authenticationService: AuthenticationService,
        private historyService: HistoryService
    ) {}
    public posiljanjePodatkov(): void {
        this.napakaNaObrazcu = "";
        this.prijavniPodatki.balance = 0;
        this.prijavniPodatki.username = this.prijavniPodatki.mail;
        if (
            !this.prijavniPodatki.name ||
            !this.prijavniPodatki.mail ||
            !this.prijavniPodatki.pass ||
            !this.prijavniPodatki.passAgain ||
            !this.prijavniPodatki.surname
        ) {
            this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
        } else if (this.prijavniPodatki.pass != this.prijavniPodatki.passAgain) {
            this.napakaNaObrazcu = "Gesli morata biti enaki! Po vsej verjetnosti ste se zmotili pri enemu.";
        } else {
            this.izvediRegistracijo();
        }
    }

    private izvediRegistracijo(): void {
        this.authenticationService
            .registracija(this.prijavniPodatki)
            .then(() => this.usmerjevalnik.navigateByUrl("/overview"))
            .catch(sporocilo => (this.napakaNaObrazcu = sporocilo));
    }

    ngOnInit() {}
}
