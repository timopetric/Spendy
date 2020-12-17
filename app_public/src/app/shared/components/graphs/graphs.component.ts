import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-graphs",
    templateUrl: "./graphs.component.html",
    styleUrls: ["./graphs.component.css"],
})
export class GraphsComponent implements OnInit {
    constructor() {}

    public prihodki;
    public odhodki;

    public getExpenses() {
        //TODO
    }

    ngOnInit(): void {}
}
