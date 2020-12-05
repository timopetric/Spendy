import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-navbar-avatar-and-choose-group",
    templateUrl: "./navbar-avatar-and-choose-group.component.html",
    styleUrls: ["./navbar-avatar-and-choose-group.component.css"],
})
export class NavbarAvatarAndChooseGroupComponent implements OnInit {
    skupine = [
        {
            // todo: extract to a ts class
            _id: "dasdasdasdasdad2213",
            name: "Skupina 1",
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
