import { Component, OnDestroy, OnInit } from "@angular/core";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { Expense } from "../../classes/expense";
import { ChartData, ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";
import { GroupsDataService } from "../../services/groups-data.service";
import { AuthenticationService } from "../../services/authentication.service";
import { GroupsPopulatedUsersModel } from "../../classes/groups-populated-users.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit, OnDestroy {
    constructor(
        private expensesData: ExpensesDataService,
        private groupsDataService: GroupsDataService,
        private authenticationService: AuthenticationService
    ) {}

    // todo: extract this to classes folder
    private userGroupsDataSub: Subscription;
    private groupSelectionSub: Subscription;
    groupSelected = "";
    userGroupsData: GroupsPopulatedUsersModel[] = [];
    loading = false;

    skupinaBalance = 0;

    uporabnik = {
        name: "",
        surname: "",
        username: "",
    };

    getUser() {
        this.uporabnik.name = this.getNameFromToken();
        this.uporabnik.surname = this.getSurnameFromToken();
        this.uporabnik.username = this.getUsernameFromToken();
    }
    getNameFromToken() {
        let { name } = this.authenticationService.vrniTrenutnegaUporabnika();
        return name;
    }
    getSurnameFromToken() {
        let { surname } = this.authenticationService.vrniTrenutnegaUporabnika();
        return surname;
    }
    getIdFromToken() {
        let { _id } = this.authenticationService.vrniTrenutnegaUporabnika();
        return _id;
    }
    getUsernameFromToken() {
        let { username } = this.authenticationService.vrniTrenutnegaUporabnika();
        return username;
    }

    public expenses: Expense[] = [];

    public barChartData: ChartDataSets[] = [];
    public barChartLabels: Label[] = [];
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

    public getExpenses(idGroup: string) {
        this.expensesData.getExpensesByGroupIdQuery(idGroup, "date=desc").then(res => {
            this.expenses = res;
            this.zadnjih5 = this.last5();
            this.zadnjih5cost = this.prihodkiVSodhodki(this.zadnjih5);
            this.vs = this.prihodkiVSodhodki(this.expenses);
            this.zadnji = this.expenses[this.expenses.length - 1];
        });
    }

    public makeGraphData(groupId: string) {
        this.expensesData.getExpensesByGroupIdQuery(groupId, "isExpenditure=false&date=desc").then(res => {
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
        this.expensesData.getExpensesByGroupIdQuery(groupId, "isExpenditure=true&date=desc").then(res => {
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
        this.loading = true;
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: GroupsPopulatedUsersModel[] }) => {
                this.userGroupsData = data.groups;
            });
        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.loading = false;
            this.groupSelected = data;
            if (this.groupSelected.length > 0) {
                this.getExpenses(this.groupSelected);
                this.makeGraphData(this.groupSelected);
            }
            for (let i = 0; i < this.userGroupsData.length; i++) {
                if (this.userGroupsData[i]._id == data) {
                    this.skupinaBalance = this.userGroupsData[i].balance;
                }
            }
        });
        this.groupsDataService.getGroupsByUser();
        this.groupsDataService.getCurrentGroup();
        this.uporabnik.username = this.getUsernameFromToken() || "";
        this.getUser();
    }
    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
    }
}
