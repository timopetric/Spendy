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
    constructor(public userDataService: UserDataService, private _snackBar: MatSnackBar) {}

    loading = true;
    userData: UserGroupPopulated = new UserGroupPopulated();

    public userForm = {
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            //https://stackoverflow.com/a/49442394 - regex pattern
            Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"),
        ]),
    };

    stevilo_skupin = 0;

    nameError = "Ime mora biti dolgo med 3 in 16 znakov";
    surnameError = "Priimek mora biti dolg med 3 in 16 znakov";
    passwordError = "Geslo ni pravilne oblike (8 znakov, velike, male črke, številke, specialni znak)";
    passwordHide = true;

    ngOnInit(): void {
        this.loading = true;
        this.userDataService.getUserGroupPopulatedData().then(userPopulated => {
            this.userData = userPopulated;
            this.updateFields();
            this.loading = false;
        });
    }

    private updateFields() {
        this.userForm.name.patchValue(this.userData.name);
        this.userForm.surname.patchValue(this.userData.surname);
        this.stevilo_skupin = this.userData.groupIds.length;
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 1500,
        });
    }

    deleteUser() {
        if (confirm("Ste prepričani, da želite izbrisati svoj račun?")) {
            console.log("Implement delete functionality here");
            // todo: add deleteUser to api, service
        }
    }

    public sendData(): void {
        let data;
        if (this.userForm.name.valid && this.userForm.surname.valid && this.userForm.password.valid) {
            this.loading = true;
            console.log("success");
            data = {
                name: this.userForm.name.value,
                surname: this.userForm.surname.value,
                pass: this.userForm.password.value,
            };
            this.userDataService.updateUserSettings(data).then(userPopulated => {
                this.userData = userPopulated;
                this.userForm.password.reset();
                this.openSnackBar("Podatki uspešno posodobljeni!");
                this.loading = false;
            });
        }
    }
}
