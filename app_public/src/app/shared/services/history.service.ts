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
                console.log(dogodekUsmerjanja);
                const url = dogodekUsmerjanja.urlAfterRedirects;
                console.log("################");
                console.log(this.urlNaslovi);
                console.log(url);
                this.urlNaslovi = [...this.urlNaslovi, url];
            });
    }
    public vrniPredhodnjeUrlNaslove(): string {
        const dolzina = this.urlNaslovi.length;
        console.log(this.urlNaslovi);
        return dolzina > 1 ? this.urlNaslovi[dolzina - 2] : "/";
    }

    public vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije(): string {
        const izloci: string[] = ["/signup", "/login", "/first-page"];
        console.log(this.urlNaslovi);
        const filtrirano = this.urlNaslovi.filter(url => !izloci.includes(url));
        const dolzina = filtrirano.length;
        // console.log(filtrirano);
        return dolzina > 1 ? filtrirano[dolzina - 1] : "/";
    }
}
