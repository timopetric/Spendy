import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-graphs",
    templateUrl: "./graphs.component.html",
    styleUrls: ["./graphs.component.css"],
})
export class GraphsComponent implements OnInit {
    constructor(private http: HttpClient) {}

    public prihodki;
    public odhodki;

    public getExpenses() {
        //TODO
    }

    ngOnInit(): void {}
}
