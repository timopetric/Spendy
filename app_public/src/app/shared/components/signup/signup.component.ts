import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { HistoryService } from "../../services/history.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { strict } from "assert";
import { Title } from "@angular/platform-browser";

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
        private historyService: HistoryService,
        private titleService: Title
    ) {
        this.titleService.setTitle("Signup");
    }
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
        } else if (!this.validateNameAndSurname(this.prijavniPodatki.name)) {
            this.napakaNaObrazcu = "Ime ni pravlne oblike!";
        } else if (!this.validateNameAndSurname(this.prijavniPodatki.surname)) {
            this.napakaNaObrazcu = "Priimek ni pravilne oblike!";
        } else if (!this.emailTest(this.prijavniPodatki.mail)) {
            this.napakaNaObrazcu = "Elektronska pošta ni pravline oblike!";
        } else if (this.prijavniPodatki.pass != this.prijavniPodatki.passAgain) {
            this.napakaNaObrazcu = "Gesli morata biti enaki! Po vsej verjetnosti ste se zmotili pri enemu.";
        } else {
            this.izvediRegistracijo();
        }
    }

    private izvediRegistracijo(): void {
        this.authenticationService
            .registracija(this.prijavniPodatki)
            .then(() =>
                this.usmerjevalnik.navigateByUrl(
                    this.historyService.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()
                )
            )
            .catch(sporocilo => (this.napakaNaObrazcu = sporocilo));
    }
    public emailTest(mail: string): boolean {
        const regularExpression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        // console.log("sem tle");
        return regularExpression.test(String(mail).toLowerCase());
    }

    public validateNameAndSurname(name: String): boolean {
        const regularExrpession = /^[a-z ,.'-]+$/i; //;
        return regularExrpession.test(String(name).toLowerCase());
    }

    ngOnInit() {}
}
