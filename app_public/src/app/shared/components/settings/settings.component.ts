import { Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { MatRipple } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
    constructor() {}

    public loading = false;

    public user = {
        name: new FormControl("Janez", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        surname: new FormControl("Novak", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            //https://stackoverflow.com/a/49442394 - regex pattern
            Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"),
        ]),
        limit: new FormControl(350.2, [Validators.required, Validators.min(0.0)]),
    };
    public stevilo_skupin = 2;

    public nameError = "Ime mora biti dolgo med 3 in 16 znakov";
    public surnameError = "Priimek mora biti dolg med 3 in 16 znakov";
    public passwordError = "Geslo ni pravilne oblike";
    public limitError = "Limit mora biti nenegativen";
    public passwordHide = true;

    ngOnInit(): void {
        this.loading = false;
    }

    public sendData(): void {
        if (this.user.name.valid && this.user.surname.valid && this.user.limit.valid && this.user.password.valid) {
            console.log("success");

            // this.izvediPrijavo();
        } else {
        }
    }
}
