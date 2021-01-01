import { Component, OnInit } from "@angular/core";
import { KriptoService } from "../../services/kripto.service";
import { Color, Label } from "ng2-charts";
import { ChartDataSets, ChartType } from "chart.js";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-analysis",
    templateUrl: "./analysis.component.html",
    styleUrls: ["./analysis.component.css"],
})
export class AnalysisComponent implements OnInit {
    constructor(private kriptoService: KriptoService, private titleService: Title) {
        this.titleService.setTitle("Analiza");
    }
    public loading = true;
    public startDate = "";
    public endDate = "";
    public bitcoinMeja = 15000;
    public bitcashMeja = 0.00045;
    public rippleMeja = 0.41;
    public bitcoinInvest = false;
    public bitcashInvest = false;
    public rippleInvest = false;

    public changeMeja() {
        let bitcoin = this.coins.find(x => x.name == "Bitcoin");
        let bitcash = this.coins.find(x => x.name == "Bitcash");
        let ripple = this.coins.find(x => x.name == "Ripple");
        let bitcoinPrice = bitcoin.data[0].data[bitcoin.data[0].data.length - 1];
        let bitcashPrice = bitcash.data[0].data[bitcash.data[0].data.length - 1];
        let ripplePrice = ripple.data[0].data[ripple.data[0].data.length - 1];
        if (bitcoinPrice < this.bitcoinMeja) {
            this.bitcoinInvest = true;
        } else this.bitcoinInvest = false;
        if (bitcashPrice < this.bitcashMeja) {
            this.bitcashInvest = true;
        } else this.bitcashInvest = false;
        if (ripplePrice < this.rippleMeja) {
            this.rippleInvest = true;
        } else this.rippleInvest = false;
    }

    public datum = {
        zacetek: "2020-12-01",
        konec: "2020-12-15",
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
                this.loading = false;
            });
    }

    public getGraphs() {
        this.loading = true;
        this.coins = [];
        this.getGraphData("bitcoin");
        this.getGraphData("ripple");
        this.getGraphData("bitcash");
    }

    ngOnInit(): void {
        this.getGraphs();
        this.datum.zacetek = this.toDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        this.datum.konec = this.toDate(new Date(Date.now()));
    }

    private toDate(datum) {
        const d = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(datum);
        const m = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(datum);
        const y = new Intl.DateTimeFormat("en", { year: "numeric" }).format(datum);
        return `${y}-${m}-${d}`;
    }

    private toUnix(datum) {
        return parseInt((new Date(datum).getTime() / 1000).toFixed(0));
    }
}
