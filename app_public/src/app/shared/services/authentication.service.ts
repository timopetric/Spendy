import { Inject, Injectable } from "@angular/core";
import { SHRAMBA_BRSKALNIKA } from "../classes/storage";
import { UserSignup } from "../classes/user-signup";
import { UserLogin } from "../classes/user-login";
import { AuthenticationResult } from "../classes/authentication-result";
import { SpendyDataService } from "./spendy-data.service";
import { UserTokenData } from "../classes/user-token-data";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage, private spendyDataService: SpendyDataService) {}

    private b64Utf8(niz: string): string {
        return decodeURIComponent(
            Array.prototype.map
                .call(atob(niz), (znak: string) => {
                    return "%" + ("00" + znak.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
    }

    public async prijava(userLogin: UserLogin): Promise<any> {
        return this.spendyDataService
            .prijava(userLogin) //todo funkcija prijava
            .then((authenticationResult: AuthenticationResult) => {
                this.shraniZeton(authenticationResult["žeton"]);
            });
    }

    public async registracija(userSignup: UserSignup): Promise<any> {
        return this.spendyDataService
            .registracija(userSignup) //todo funkcija prijava
            .then((authenticationResult: AuthenticationResult) => {
                this.shraniZeton(authenticationResult["žeton"]);
            });
    }

    public odjava(): void {
        this.shramba.removeItem("spendysp-zeton");
    }

    // Preverimo ali je naš uporabnik v tem trenutku prijavljen
    public jePrijavljen(): boolean {
        const zeton: string = this.vrniZeton();
        if (zeton) {
            // Na podlagi koristne vsebine pogledamo veljavnost. S tem boo dosegli, da bo nekatere stvari lahko videl
            // le prijavljen uporabnik
            const koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split(".")[1]));
            return koristnaVsebina.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    //žetoni, ko se prijavimo ali registriramo dobimo na stran odjemalcva žeton. Ta žeton lahko potem uporabimo pri vseh oprecijah, ki se kličejo in ga
    // lahko kličemo v vseh komponentah in tudi podatke pridobimo iz njega.
    public vrniZeton(): string {
        return this.shramba.getItem("spendysp-zeton");
    }

    public shraniZeton(zeton: string): void {
        this.shramba.setItem("spendysp-zeton", zeton);
    }

    public vrniTrenutnegaUporabnika(): UserTokenData {
        // console.log(this.jePrijavljen());

        if (this.jePrijavljen()) {
            const zeton: string = this.vrniZeton();
            const { _id, username, mail, name, surname } = JSON.parse(this.b64Utf8(zeton.split(".")[1]));
            // console.log({ _id, username, mail, name, surname });
            return { _id, username, mail, name, surname } as UserTokenData; // UserTokenData(_id, username, mail, name, surname);
        }
    }
}
