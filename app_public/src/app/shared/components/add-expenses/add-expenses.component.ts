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

    public dateError = false;
    public costError = false;
    public descriptionError = false;

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
        this.isFilled();
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
        this.Expense.cost == 0 ? (this.costError = true) : (this.costError = false);
        Math.floor(this.Expense.cost * 100) / 100 == 0 ? (this.costError = true) : (this.costError = false);
        this.Expense.description.length == 0 ? (this.descriptionError = true) : (this.descriptionError = false);
        this.Expense.date == null ? (this.dateError = true) : (this.dateError = false);
        console.log(this.Expense.date);
        return !(this.costError || this.descriptionError || this.dateError);
    }

    public isGood() {
        if (this.Expense.cost !== 0) this.costError = false;
        if (this.Expense.description.length >= 3) this.descriptionError = false;
        if (this.Expense.date !== null) this.dateError = false;
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 5000,
        });
    }

    public postExpense() {
        this.Expense.group = "5fe087f6fabe4b365c8a7998";
        if (this.isFilled()) {
            this.expensesData.addExpenseToGroup(this.Expense.group, this.Expense).then(res => {
                this.ponastavi();
                this.openSnackBar("Expense uspešno dodan!!!");
            });
        }
    }
    ngOnInit(): void {}
}
