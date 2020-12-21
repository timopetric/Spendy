import { Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { MatRipple } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserDataService } from "../../services/user-data.service";
import { User } from "../../classes/user.model";
import { UserGroupPopulated } from "../../classes/user-group-populated";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
    constructor(public userDataService: UserDataService) {}

    public loading = true;
    public userData: UserGroupPopulated = new UserGroupPopulated();

    public user = {
        name: new FormControl(this.userData.name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
        ]),
        surname: new FormControl(this.userData.surname, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
        ]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            //https://stackoverflow.com/a/49442394 - regex pattern
            Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"),
        ]),
        limit: new FormControl(this.userData.balance, [Validators.required, Validators.min(0.0)]),
    };
    // todo: limit je nastavljen na balance! v apiju posodobi da se bo limit
    //       nastavljal tudi na posebno uporabnikovo skupino

    public stevilo_skupin = 2;

    public nameError = "Ime mora biti dolgo med 3 in 16 znakov";
    public surnameError = "Priimek mora biti dolg med 3 in 16 znakov";
    public passwordError = "Geslo ni pravilne oblike";
    public limitError = "Limit mora biti nenegativen";
    public passwordHide = true;

    ngOnInit(): void {
        this.userDataService.getUserData().then(() => {
            this.userData = this.userDataService.userPopulated;

            this.user.name.patchValue(this.userData.name);
            this.user.surname.patchValue(this.userData.surname);
            this.user.limit.patchValue(this.userData.balance);
            this.stevilo_skupin = this.userData.groupIds.length;
            this.loading = false;
        });
    }

    public sendData(): void {
        let data;
        if (this.user.name.valid && this.user.surname.valid && this.user.limit.valid && this.user.password.valid) {
            console.log("success");
            data = {
                name: this.user.name.value,
                surname: this.user.surname.value,
                limit: this.user.limit.value,
                password: this.user.name.value,
            };
            this.userDataService.updateUserSettings(data);
        } else {
            // data = {
            //     name: "Imeee",
            //     surname: "Priimekkkk",
            //     limit: 333,
            //     password: "keks123",
            // };
            // this.userDataService.updateUserSettings(data);
            //
            // this.userDataService.getUserData().then(user => {
            //     console.log(user);
            //     this.userData = { ...user };
            //     console.log(this.userData);
            // });
        }
    }
}
