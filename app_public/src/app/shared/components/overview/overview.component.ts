import { Component, OnInit } from "@angular/core";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { Expense } from "../../classes/expense";
import { ChartData, ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
    // todo: extract this to classes folder
    uporabnik = {
        name: "Janez",
        surname: "Novak",
        balance: 222,
    };
    public expenses: Expense[] = [];

    public barChartData: ChartDataSets[] = [];
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = "bar";
    public barChartLegend = true;
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: "end",
                align: "end",
            },
        },
    };

    public zadnjih5: Expense[] = [];
    public vs;
    public zadnji;
    public zadnjih5cost;

    public last5() {
        if (this.expenses.length == 0) {
            return [];
        } else if (this.expenses.length < 5) {
            return this.expenses;
        } else {
            return this.expenses.slice(0, 5);
        }
    }

    private prihodkiVSodhodki(expenses) {
        let sum = 0;
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].isExpenditure) {
                sum = sum - expenses[i].cost;
            } else {
                sum = sum + expenses[i].cost;
            }
        }
        return sum;
    }

    constructor(private expensesData: ExpensesDataService) {}

    public getExpenses() {
        this.expensesData.getExpensesByGroupIdQuery("5fe087f6fabe4b365c8a7998", "date=desc").then(res => {
            this.expenses = res;
            this.zadnjih5 = this.last5();
            this.zadnjih5cost = this.prihodkiVSodhodki(this.zadnjih5);
            this.vs = this.prihodkiVSodhodki(this.expenses);
            this.zadnji = this.expenses[this.expenses.length - 1];
        });
    }

    public makeGraphData() {
        this.expensesData
            .getExpensesByGroupIdQuery("5fe087f6fabe4b365c8a7998", "isExpenditure=false&date=desc")
            .then(res => {
                let tmp = res;
                let tmpData = [];
                for (let i = 0; i < tmp.length; i++) {
                    tmpData.push(tmp[i].cost);
                    const datum = new Date(tmp[i].date);
                    const d = datum.getDate();
                    const m = datum.getMonth() + 1;
                    const l = datum.getFullYear();
                    this.barChartLabels.push(`${d}. ${m}, ${l}`);
                }
                const podatki = {
                    data: tmpData,
                    label: "prihodki",
                    backgroundColor: "rgb(104,255,99)",
                    borderColor: "rgb(104,255,99)",
                };
                this.barChartData.push(podatki);
                if (this.barChartData.length == 3) {
                    for (let i = 0; i < 3; i++) {
                        if (this.barChartData[i] && this.barChartData[i].data.length == 0) {
                            this.barChartData.splice(i, 1);
                        }
                    }
                }
            });
        this.expensesData
            .getExpensesByGroupIdQuery("5fe087f6fabe4b365c8a7998", "isExpenditure=true&date=desc")
            .then(res => {
                let tmp = res;
                let tmpData = [];
                for (let i = 0; i < tmp.length; i++) {
                    tmpData.push(tmp[i].cost);

                    const datum = new Date(tmp[i].date);
                    const d = datum.getDate();
                    const m = datum.getMonth() + 1;
                    const l = datum.getFullYear();

                    this.barChartLabels.push(`${d}. ${m}, ${l}`);
                }
                const podatki = {
                    data: tmpData,
                    label: "odhodki",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                };
                this.barChartData.push(podatki);
                if (this.barChartData.length == 3) {
                    for (let i = 0; i < 3; i++) {
                        if (this.barChartData[i] && this.barChartData[i].data.length == 0) {
                            this.barChartData.splice(i, 1);
                        }
                    }
                }
            });
    }

    ngOnInit(): void {
        this.getExpenses();
        this.makeGraphData();
    }
}
