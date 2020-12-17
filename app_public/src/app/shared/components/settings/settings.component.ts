import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css", "../../../../assets/stylesheets/style-profil.css"],
})
export class SettingsComponent implements OnInit {
    constructor() {}
    public user = {
        username: "matija123",
    };
    public stevilo_skupin = 2;

    ngOnInit(): void {}
}
