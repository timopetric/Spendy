import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class HistoryService {
    private urlNaslovi: string[] = [];

    constructor(private usmerjevalnik: Router) {
        this.usmerjevalnik.events
            .pipe(filter(dogodekUsmerjanja => dogodekUsmerjanja instanceof NavigationEnd))
            .subscribe((dogodekUsmerjanja: NavigationEnd) => {
                const url = dogodekUsmerjanja.urlAfterRedirects;
                this.dodajUrl(url);
                // console.log("################");
                // console.log(dogodekUsmerjanja);
                // console.log(url);
                // console.log(this.urlNaslovi);
            });
    }

    public dodajUrl(url) {
        this.urlNaslovi = [...this.urlNaslovi, url];
    }

    public vrniPredhodnjeUrlNaslove(): string {
        const dolzina = this.urlNaslovi.length;
        // console.log(this.urlNaslovi);
        return dolzina > 1 ? this.urlNaslovi[dolzina - 2] : "/";
    }

    public vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije(): string {
        const izloci: string[] = ["/signup", "/login", "/first-page"];
        // console.log(this.urlNaslovi);
        const filtrirano = this.urlNaslovi.filter(url => !izloci.includes(url));
        const dolzina = filtrirano.length;
        // console.log(filtrirano);
        // console.log("#################################");
        // console.log(filtrirano);
        // console.log("THISSS:");
        // console.log(dolzina > 1 ? filtrirano[dolzina - 1] : "/");
        return dolzina >= 1 ? filtrirano[dolzina - 1] : "/";
    }
}
