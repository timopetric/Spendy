import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Uporabnik } from "../components/profile/profile.component";

import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: "root",
})
export class UporabnikService {
    constructor(private http: HttpClient) {}

    // private uporabnik: Uporabnik;

    public pridobiUporabnika(name): Promise<Uporabnik> {
        // const userId: number = 1;//poglej kaksni id-ji se naredijo
        // const name: string = "Metka";
        // const url: string = `v1/users/${userId}`;
        const url: string = `${API_URL}/users/name/${name}`;
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
