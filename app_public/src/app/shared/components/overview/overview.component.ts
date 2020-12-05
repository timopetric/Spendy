import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
    // todo: extract this to classes folder
    uporabnik = {
        name: "Janez",
        surname: "Novak",
        balance: 222,
    };

    constructor() {}

    ngOnInit(): void {}
}
