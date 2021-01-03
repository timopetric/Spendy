import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "../../../services/connection.service";

@Component({
    selector: "app-navbar-login-signup",
    templateUrl: "./navbar-login-signup.component.html",
    styleUrls: ["./navbar-login-signup.component.css"],
})
export class NavbarLoginSignupComponent implements OnInit {
    constructor(private connectionService: ConnectionService) {}
    isOnline(): boolean {
        return this.connectionService.isOnline;
    }
    ngOnInit(): void {}
}
