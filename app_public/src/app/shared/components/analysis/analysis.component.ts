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

    public kek() {
        console.log(this.startDate);
    }

    public graphBitcoin;
    public graphRipple;
    public coins = [];
    public labelGraph = ["bitcoin graph"];
    public typeGraph: ChartType = "line";
    public graphColors: Color[] = [{ backgroundColor: "rgba(92, 184, 92, 1)" }];

    public getGraphData(coin) {
        // todo: date start..
        this.kriptoService.getGraphData(coin, "1604243746", "1604589346").then(response => {
            let tmpObject = {
                data: response.graphData,
                labels: response.labels,
                name: coin[0].toUpperCase() + coin.slice(1),
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
}
