import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { GroupsDataService } from "../../services/groups-data.service";
import { AuthenticationService } from "../../services/authentication.service";
import { Subscription } from "rxjs";
import { GroupsPopulatedUsersModel } from "../../classes/groups-populated-users.model";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-graphs",
    templateUrl: "./graphs.component.html",
    styleUrls: ["./graphs.component.css"],
})
export class GraphsComponent implements OnInit, OnDestroy {
    constructor(
        private expensesData: ExpensesDataService,
        private groupsDataService: GroupsDataService,
        private authenticationService: AuthenticationService,
        private titleService: Title
    ) {
        this.titleService.setTitle("Grafično");
    }

    // todo: extract this to classes folder
    private userGroupsDataSub: Subscription;
    private groupSelectionSub: Subscription;
    groupSelected = "";
    userGroupsData: GroupsPopulatedUsersModel[] = [];
    loading = false;
    public napaka = "";

    public prihodkiChartData: ChartDataSets[] = [];
    public prihodkiChartLabels: Label[] = [];

    public odhodkiChartData: ChartDataSets[] = [];
    public odhodkiChartLabels: Label[] = [];

    public pieChartData: ChartDataSets[] = [];
    private odhodkiSum = 0;
    private prihodkiSum = 0;
    public pieChartLabels: Label[] = ["Prihodki", "Odhodki"];
    public pieChartType: ChartType = "doughnut";
    public pieChartLegend = true;

    public barChartType: ChartType = "bar";
    public barChartLegend = true;
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [{}],
            yAxes: [
                {
                    ticks: {
                        min: 0,
                    },
                },
            ],
        },
        plugins: {
            datalabels: {
                anchor: "end",
                align: "end",
            },
        },
    };

    public makeGraphData(groupId: string) {
        this.expensesData
            .getExpensesByGroupIdQuery(groupId, "isExpenditure=false&date=desc")
            .then(res => {
                this.prihodkiChartData = [];
                this.prihodkiChartLabels = [];
                this.odhodkiChartData = [];
                this.odhodkiChartLabels = [];
                this.pieChartData = [];
                this.odhodkiSum = 0;
                this.prihodkiSum = 0;
                let tmp = res;
                let tmpData = [];
                for (let i = 0; i < tmp.length; i++) {
                    tmpData.push(tmp[i].cost);
                    this.prihodkiSum += tmp[i].cost;
                    const datum = new Date(tmp[i].date);
                    const d = datum.getDate();
                    const m = datum.getMonth() + 1;
                    const l = datum.getFullYear();
                    this.prihodkiChartLabels.push(`${d}. ${m}, ${l}`);
                }
                const podatki = {
                    data: tmpData,
                    label: "prihodki",
                    backgroundColor: "rgb(104,255,99)",
                    borderColor: "rgb(104,255,99)",
                };

                this.prihodkiChartData.push(podatki);
                /*
            if (this.prihodkiChartData.length >= 2) {
                for (let i = 0; i < this.prihodkiChartData.length ; i++) {
                    if (this.prihodkiChartData[i] && this.prihodkiChartData[i].data.length == 0) {
                        this.prihodkiChartData.splice(i, 1);
                    }
                }
            }*/
            })
            .then(tmp => {
                this.expensesData.getExpensesByGroupIdQuery(groupId, "isExpenditure=true&date=desc").then(res => {
                    let tmp = res;
                    let tmpData = [];
                    for (let i = 0; i < tmp.length; i++) {
                        tmpData.push(tmp[i].cost);
                        this.odhodkiSum += tmp[i].cost;
                        const datum = new Date(tmp[i].date);
                        const d = datum.getDate();
                        const m = datum.getMonth() + 1;
                        const l = datum.getFullYear();

                        this.odhodkiChartLabels.push(`${d}. ${m}, ${l}`);
                    }
                    const podatki = {
                        data: tmpData,
                        label: "odhodki",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                    };
                    this.odhodkiChartData.push(podatki);
                    /*
                if (this.odhodkiChartData.length >= 2) {
                    for (let i = 1; i < this.odhodkiChartData.length; i++) {

                        this.odhodkiChartData.slice(i, 1);

                    }
                }
  */

                    const podatkiPie = {
                        data: [this.prihodkiSum, this.odhodkiSum],
                        backgroundColor: ["rgb(104,255,99)", "rgb(255, 99, 132)"],
                        borderColor: ["rgb(104,255,99)", "rgb(255, 99, 132)"],
                    };
                    this.pieChartData.push(podatkiPie);
                    this.loading = false;
                });
            })
            .catch(sporocilo => (this.napaka = sporocilo));
    }

    ngOnInit(): void {
        this.loading = true;
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: GroupsPopulatedUsersModel[] }) => {
                this.userGroupsData = data.groups;
            });
        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.groupSelected = data;

            this.prihodkiChartData = [];
            this.prihodkiChartLabels = [];
            this.odhodkiChartData = [];
            this.odhodkiChartLabels = [];
            this.pieChartData = [];
            this.odhodkiSum = 0;
            this.prihodkiSum = 0;

            if (this.groupSelected.length > 0) {
                this.makeGraphData(this.groupSelected);
            }
        });
        // this.groupsDataService.getGroupsByUser();
        // this.groupsDataService.getCurrentGroup();
    }
    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
        this.groupSelectionSub.unsubscribe();
        this.prihodkiChartData = [];
        this.prihodkiChartLabels = [];
        this.odhodkiChartData = [];
        this.odhodkiChartLabels = [];
        this.pieChartData = [];
        this.odhodkiSum = 0;
        this.prihodkiSum = 0;
    }
}
