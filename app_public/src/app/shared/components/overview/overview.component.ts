import { Component, OnDestroy, OnInit } from "@angular/core";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { ConnectionService } from "../../services/connection.service";
import { Expense } from "../../classes/expense";
import { ChartData, ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";
import { GroupsDataService } from "../../services/groups-data.service";
import { AuthenticationService } from "../../services/authentication.service";
import { GroupsPopulatedUsersModel } from "../../classes/groups-populated-users.model";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit, OnDestroy {
    constructor(
        private expensesData: ExpensesDataService,
        private groupsDataService: GroupsDataService,
        private authenticationService: AuthenticationService,
        private titleService: Title,
        private conectionService: ConnectionService
    ) {
        this.titleService.setTitle("Pregled");
    }
    isOnline(): boolean {
        return this.conectionService.isOnline;
    }
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

    public zadnjih5odhodkov: Expense[] = [];
    public zadnjih5prihodkov: Expense[] = [];
    public z5o = null;
    public z5p = null;
    public vs = null;
    public zadnji = null;
    public zadnjih5cost = null;
    public zadnjih5 = null;

    public last5(array) {
        if (array.length == 0) {
            return [];
        } else if (array.length < 5) {
            return array;
        } else {
            return array.slice(0, 5);
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
        return Math.round((sum + Number.EPSILON) * 100) / 100;
    }

    public getExpenses(idGroup: string) {
        this.expensesData.getExpensesByGroupIdQuery(idGroup, "date=desc").then(res => {
            this.expenses = res;
            this.zadnjih5 = this.last5(this.expenses);
            this.vs = this.prihodkiVSodhodki(this.expenses);
            this.zadnji = this.expenses[this.expenses.length - 1];
        });
    }
    public zracuni5(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + array[i];
        }
        return sum;
    }

    public makeGraphData(groupId: string) {
        this.expensesData
            .getExpensesByGroupIdQuery(groupId, "isExpenditure=false&date=desc")
            .then(res => {
                this.barChartData = [];
                this.barChartLabels = [];
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
                this.zadnjih5prihodkov = this.last5(tmpData);
                this.z5p = this.zracuni5(this.zadnjih5prihodkov);
            })
            .then(tmp12 => {
                this.expensesData.getExpensesByGroupIdQuery(groupId, "isExpenditure=true&date=desc").then(res1 => {
                    let tmp = res1;
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
                    if (this.barChartData.length > 2) {
                        this.barChartData.splice(2, 2);
                    }
                    this.zadnjih5odhodkov = this.last5(tmpData);
                    this.z5o = this.zracuni5(this.zadnjih5odhodkov);
                });
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
            this.barChartData = [];
            this.barChartLabels = [];
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
        // this.groupsDataService.getGroupsByUser();
        // this.groupsDataService.getCurrentGroup();
        this.uporabnik.username = this.getUsernameFromToken() || "";
        this.getUser();
    }
    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
        this.groupSelectionSub.unsubscribe();
        this.barChartData = [];
        this.barChartLabels = [];
    }
}
