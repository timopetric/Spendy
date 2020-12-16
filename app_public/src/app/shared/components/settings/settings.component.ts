import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css", "../../../../assets/stylesheets/style-profil.css"],
})
export class SettingsComponent implements OnInit {
    uporabnik = {
        username: "janeznovak",
        stSkupin: "50",
    };

    constructor() {}

    ngOnInit(): void {}
}
