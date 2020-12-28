import { Component, OnInit } from "@angular/core";
import { Expense } from "../../../classes/expense";
import { ExpensesDataService } from "../../../services/expenses-data.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
    public expenses: Expense[];
    public message: string;
    private idGroup = "5fc3b42d42a9c61684ffd07c";
    public p: number = 1;
    constructor(private expensesData: ExpensesDataService) {}
    public count: number;
    public query: string = "";
    public search: string = "";
    public searchq: string = "";
    ngOnInit(): void {
        this.getExpensesByGroupId(this.idGroup);
    }

    private getExpensesByGroupId = (idGroup: string): void => {
        this.message = "Fetching expenses data";
        this.expensesData
            .getExpensesByGroupIdPaginated(idGroup, this.p, this.query, this.searchq)
            .then(expenses => {
                console.log(expenses);
                this.message = expenses.length > 0 ? "" : "There are no expenses";
                this.expenses = expenses["aktivnosti"];
                this.count = expenses["count"];
            })
            .catch(error => {
                this.showError(error);
            });
    };

    public inc(page) {
        this.p = page;
        this.getExpensesByGroupId(this.idGroup);
        console.log(page);
    }

    public filterActivities(page, query, search) {
        this.p = page;
        this.query = query;
        this.p = 1;

        if (search != "") {
            this.searchq = query != "" ? `&search=${search}` : `search=${search}`;
        } else {
            this.search = "";
            this.searchq = "";
        }

        if (this.searchq == "search=" || this.searchq == "&search=") this.searchq = "";

        this.getExpensesByGroupId(this.idGroup);
    }

    private showError = (napaka: any): void => {
        this.message = napaka.message || napaka;
    };
}
