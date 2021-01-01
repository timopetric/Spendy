import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.jePrijavljen()) {
            // redirect to some view explaining what happened
            this.router.navigateByUrl("/login");
            return false;
        } else {
            return true;
        }
    }
}
