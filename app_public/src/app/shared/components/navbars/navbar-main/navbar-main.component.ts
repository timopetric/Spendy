import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "../../../services/connection.service";

@Component({
    selector: "app-navbar-main",
    templateUrl: "./navbar-main.component.html",
    styleUrls: ["./navbar-main.component.css"],
})
export class NavbarMainComponent implements OnInit {
    constructor(private connectionService: ConnectionService) {}
    isOnline(): boolean {
        return this.connectionService.isOnline;
    }

    ngOnInit(): void {}
}
