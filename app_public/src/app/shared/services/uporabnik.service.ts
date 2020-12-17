import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Uporabnik } from "../components/profile/profile.component";

@Injectable({
    providedIn: "root",
})
export class UporabnikService {
    constructor(private http: HttpClient) {}

    private apiUrl = "http://localhost:3000/api";

    public uporabin: Uporabnik;

    public pridobiUporabnika(name): Promise<Uporabnik> {
        // const userId: number = 1;//poglej kaksni id-ji se naredijo
        // const name: string = "Metka";
        // const url: string = `v1/users/${userId}`;
        const url: string = `${this.apiUrl}/v2/users/name/${name}`;
        return this.http
            .get(url)
            .toPromise()
            .then(odgovor => odgovor as Uporabnik)
            .catch(UporabnikService.obdelajNapako);
    }

    private static obdelajNapako(napaka: any): Promise<any> {
        console.error("Prišlo je do napake", napaka);
        return Promise.reject(napaka.message || napaka);
    }
}
