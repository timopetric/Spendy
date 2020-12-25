import { Component, OnInit } from "@angular/core";
import { SpendyDataService } from "../../services/spendy-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { addExpense } from "../../classes/addExpense";

@Component({
    selector: "app-add-expenses",
    templateUrl: "./add-expenses.component.html",
    styleUrls: ["./add-expenses.component.css", "../../../../assets/stylesheets/add_expenses_button.css"],
})
export class AddExpensesComponent implements OnInit {
    constructor(
        private SpendyDataService: SpendyDataService,
        private _snackBar: MatSnackBar,
        private expensesData: ExpensesDataService
    ) {}

    toggler: any = {
        onColor: "danger",
        offColor: "success",
        onText: "Odhodek",
        offText: "Prihodek",
        value: false,
    };

    public Expense: addExpense = {
        isExpenditure: false,
        cost: 0,
        date: null,
        category_name: "Hrana",
        group: "",
        description: "",
        created_by: "5fe087f6fabe4b365c8a7998",
    };

    public ponastavi() {
        this.Expense = {
            isExpenditure: false,
            cost: 0,
            date: null,
            category_name: "Hrana",
            group: "",
            description: "",
            created_by: "5fe087f6fabe4b365c8a7998",
        };
    }

    private isFilled() {
        if (this.Expense.cost == 0) return false;
        if (this.Expense.description == "") return false;
        if (this.Expense.date == null) {
            return false;
        }
        return true;
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 5000,
        });
    }

    public postExpense() {
        this.Expense.group = "5fe087f6fabe4b365c8a7998";
        console.log(this.Expense);
        if (this.isFilled()) {
            this.expensesData.addExpenseToGroup(this.Expense.group, this.Expense).then(res => {
                this.ponastavi();
                this.openSnackBar("Expense uspešno dodan!!!");
            });
        } else {
            alert("izpolnite vsa polja");
        }
    }
    ngOnInit(): void {}
}
