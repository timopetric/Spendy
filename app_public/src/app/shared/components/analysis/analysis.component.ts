import { Component, OnInit } from "@angular/core";
import { KriptoService } from "../../services/kripto.service";
import { Color, Label } from "ng2-charts";
import { ChartDataSets, ChartType } from "chart.js";

@Component({
    selector: "app-analysis",
    templateUrl: "./analysis.component.html",
    styleUrls: ["./analysis.component.css"],
})
export class AnalysisComponent implements OnInit {
    constructor(private kriptoService: KriptoService) {}

    public startDate = "";
    public endDate = "";
    public datum = {
        zacetek: new Date("2020.12.01"),
        konec: new Date("2020.12.15"),
    };

    public coins = [];
    public typeGraph: ChartType = "line";

    public getGraphData(coin) {
        // todo: date start..
        this.kriptoService
            .getGraphData(coin, this.toUnix(this.datum.zacetek), this.toUnix(this.datum.konec))
            .then(response => {
                let graphColor: Color[] = [{ backgroundColor: "rgba(92, 184, 92, 1)" }];
                switch (coin) {
                    case "bitcoin":
                        graphColor = [{ backgroundColor: "rgba(244, 210, 40, 0.93)" }];
                        break;
                    case "ripple":
                        graphColor = [{ backgroundColor: "rgba(70, 241, 78, 0.93)" }];
                        break;
                    case "bitcash":
                        graphColor = [{ backgroundColor: "rgba(60, 89, 235, 0.88)" }];
                        break;
                }
                let tmpObject = {
                    data: response.graphData,
                    labels: response.labels,
                    name: coin[0].toUpperCase() + coin.slice(1),
                    graphColor: graphColor,
                };
                this.coins.push(tmpObject);
            });
    }

    public getGraphs() {
        this.coins = [];
        this.getGraphData("bitcoin");
        this.getGraphData("ripple");
        this.getGraphData("bitcash");
    }

    ngOnInit(): void {
        this.getGraphs();
    }

    public izpisiDatum() {
        console.log("DATUMA");
        console.log(this.toUnix(new Date(this.datum.zacetek)));
        console.log(this.datum.konec);
    }

    private toUnix(datum) {
        return parseInt((new Date(datum).getTime() / 1000).toFixed(0));
    }
}
