import { Component, OnInit } from "@angular/core";
import { Expense } from "../../classes/expense";
import { ExpensesDataService } from "../../services/expenses-data.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
    public expenses: Expense[];
    public message: string;

    constructor(private expensesData: ExpensesDataService) {}

    ngOnInit(): void {}

    private getExpensesByGroupId = (idGroup: string): void => {
        this.message = "Fetching expenses data";
        this.expensesData
            .getExpensesByGroupId(idGroup)
            .then(expenses => {
                this.message = expenses.length > 0 ? "" : "There are no expenses";
                this.expenses = expenses;
            })
            .catch(error => {
                this.showError(error);
            });
    };

    private showError = (napaka: any): void => {
        this.message = napaka.message || napaka;
    };
}
