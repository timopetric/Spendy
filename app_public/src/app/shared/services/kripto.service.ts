import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Injectable({
    providedIn: "root",
})
export class KriptoService {
    constructor(private http: HttpClient) {}

    public graphDataBitcoin;

    // private toUnix(date: string) {
    //     return parseInt(date / 1000).toFixed(0);
    // }

    public getGraphData(name, unixTimeStart, unixTimeEnd): any {
        return this.http
            .get(
                "https://api.coingecko.com/api/v3/coins/" +
                    name +
                    "/market_chart/range?vs_currency=eur&from=" +
                    unixTimeStart +
                    "&to=" +
                    unixTimeEnd
            )
            .toPromise()
            .then((response: any) => {
                let resData = response.prices;
                let nameCapitalized = name[0].toUpperCase() + name.slice(1);

                let graphData: ChartDataSets[];
                let data = [];
                for (let i = 0; i < resData.length; i++) {
                    data.push(Math.round(100 * resData[i][1]) / 100);
                }
                graphData = [{ data: data, label: `${nameCapitalized} cena v €` }];

                let labels: Label[] = [];
                for (let i = 0; i < resData.length; i++) {
                    const datum = new Date(resData[i][0]);
                    const d = datum.getDate();
                    const m = datum.getMonth();
                    const l = datum.getFullYear();
                    labels.push(`${d}. ${m}, ${l}`);
                }
                return { labels: labels, graphData: graphData };
            });
        // .then((response: any) => {
        //     console.log(response);
        //     // this.graphDataBitcoin = response;
        //     return response;
        // });
    }
}
//
// const getGraphDataInterval = (ime, start, finish) => {
//     try {
//         return axios.get(
//             "https://api.coingecko.com/api/v3/coins/" +
//                 ime +
//                 "/market_chart/range?vs_currency=eur&from=" +
//                 toUnix(start) +
//                 "&to=" +
//                 toUnix(finish)
//         );
//     } catch (error) {
//         console.error(error);
//     }
// };
//
// getGraphDataInterval("bitcoin", dateStart, dateFinish)
//     .then(response => {
//         if (response.data.prices) {
//             bitcoinGraph = response.data.prices;
//             console.log(bitcoinGraph);
//
//                 graphData: {
//                     bitcoin: bitcoinGraph,
//                     bitcash: bitcashGraph,
//                     ripple: rippleGraph,
//                 },
//                 uporabnik: user,
//                 skupine: user.groupIds,
//
//         }
//     })
//     .catch(error => {
//         console.log(error);
//     });
