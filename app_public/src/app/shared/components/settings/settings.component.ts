import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: [
        "./settings.component.css",
        // "../../../../assets/stylesheets/style-profil.css"
    ],
})
export class SettingsComponent implements OnInit {
    constructor() {}

    public loaded = false;

    public errorMessage = "";
    public user = {
        username: "matija123",
        name: "Janez",
        surname: "Novak",
        email: "matija@gmail.si",
        limit: 350.2,
    };
    public stevilo_skupin = 2;

    public name = new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),
    ]);
    public nameError = "Ime mora biti dolgo med 3 in 16 znakov";

    public surname = new FormControl(this.user.surname, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),
    ]);
    public surnameError = "Priimek mora biti dolg med 3 in 16 znakov";

    public email = new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.email,
    ]);
    // todo: add custom validator
    public emailError = "Email mora biti veljaven in dolg med 3 in 30 znakov";

    public password1 = new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        //https://stackoverflow.com/a/49442394 - regex pattern
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"),
    ]);
    public password2 = new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"),
    ]);
    public passwordHide = true;
    public passwordError = "Geslo mora biti dolgo vsaj 8 znakov";
    public passwordNotSameError = null;

    public validatePasswords($event: Event) {
        if (this.password1.value.notEqual(this.password2.value)) {
            this.passwordNotSameError = "Gesli morata biti enaki";
        } else {
            this.passwordNotSameError = null;
        }
    }

    public limit = new FormControl(this.user.limit, [Validators.required, Validators.min(0.0)]);
    public limitError = "Limit mora imeti nenegativno vrednost";

    ngOnInit(): void {
        this.loaded = true;
    }
}
