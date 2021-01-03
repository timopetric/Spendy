import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "../../../services/connection.service";

@Component({
    selector: "app-first-page-navbar",
    templateUrl: "./navbar-first-page.component.html",
    styleUrls: [
        "../../../../../assets/stylesheets/first-pages.css",
        // "./first-page-navbar.component.css",
    ],
})
export class FirstPageNavbarComponent implements OnInit {
    constructor(private connectionService: ConnectionService) {}
    isOnline(): boolean {
        return this.connectionService.isOnline;
    }
    ngOnInit(): void {}
}
