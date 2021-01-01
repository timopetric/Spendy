import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { HistoryService } from "../../shared/services/history.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private historyService: HistoryService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.jePrijavljen()) {
            // redirect to some view explaining what happened
            // console.log(state.url);
            this.historyService.dodajUrl(state.url);
            this.router.navigateByUrl("/login");
            return false;
        } else {
            return true;
        }
    }
}
