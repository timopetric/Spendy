import { Component, OnInit } from "@angular/core";
import { ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
    selector: "app-first-page",
    templateUrl: "./first-page.component.html",
    styleUrls: [
        "../../../../assets/stylesheets/first-pages.css",
        // "./first-page.component.css"
    ],
})
export class FirstPageComponent implements OnInit {
    doughnutChartLabels: Label[] = ["Sales Q1", "Sales Q2", "Sales Q3", "Sales Q4"];
    doughnutChartData = [120, 150, 180, 90];
    doughnutChartType: ChartType = "doughnut";

    constructor() {}

    ngOnInit(): void {}
}
