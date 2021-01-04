import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserDataService } from "../../services/user-data.service";
import { User } from "../../classes/user.model";
import { Router } from "@angular/router";
import { UserSettings } from "../../classes/UserSettings";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { ConnectionService } from "../../services/connection.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit, OnDestroy {
    constructor(
        public userDataService: UserDataService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private titleService: Title,
        private connectionService: ConnectionService
    ) {
        this.titleService.setTitle("Nastavitve");
    }
    private userDataSub: Subscription;

    loading = true;
    passwordHide = true;
    deleteError = "";
    apiError = "";
    userData: User = new User();
    userGroupsNumber = 0;

    isOnline(): boolean {
        return this.connectionService.isOnline;
    }

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
    nameError = "Ime mora biti dolgo med 3 in 16 znakov";
    surnameError = "Priimek mora biti dolg med 3 in 16 znakov";
    passwordError = "Geslo ni pravilne oblike (8 znakov, velike, male črke, številke, specialni znak)";

    ngOnInit(): void {
        this.loading = true;
        this.userDataSub = this.userDataService
            .getUserUpdateListener()
            .subscribe((user: { message: string; user: User }) => {
                this.userData = user.user;
                this.updateFieldsAndSaveUser(user);
            });
        this.userDataService.getUser();
    }

    ngOnDestroy() {
        this.userDataSub.unsubscribe();
    }

    private updateFieldsAndSaveUser(data: { message: string; user: User }) {
        if (data.message === "OK" || data.message === "UPDATED") {
            this.loading = false;
            this.userForm.name.patchValue(data.user.name);
            this.userForm.surname.patchValue(data.user.surname);
            this.userGroupsNumber = data.user.groupIds.length;
            this.userForm.password.reset();
            this.userData = data.user;
            this.apiError = "";
            if (data.message === "UPDATED") {
                this.openSnackBar("Podatki uspešno posodobljeni!");
            }
        } else {
            console.log("Could not update user");
            this.apiError = data.message;
            this.openSnackBar(data.message);
            this.loading = true;
        }
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 10000,
        });
    }

    deleteUser() {
        if (confirm("Ste prepričani, da želite izbrisati svoj račun?")) {
            let userId = this.userDataService.getUserId();
            this.userDataService.deleteUser(userId).then(resp => {
                if (resp === null) {
                    // successfully deleted user
                    this.userData = null;
                    this.deleteError = "";
                    alert("Uporabnik uspešno izbrisan");
                    this.router.navigateByUrl("/first-page");
                } else {
                    this.deleteError = "Napaka: Izbris uporabnika ni uspel";
                }
            });
        }
    }

    public updateUser(): void {
        if (this.userForm.name.valid && this.userForm.surname.valid && this.userForm.password.valid) {
            this.loading = true;
            let data = new UserSettings(
                this.userForm.name.value,
                this.userForm.surname.value,
                this.userForm.password.value
            );
            this.userDataService.updateUser(data);
        }
    }
}
