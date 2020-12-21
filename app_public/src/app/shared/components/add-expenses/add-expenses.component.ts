import { Component, OnInit } from "@angular/core";
import { SpendyDataService } from "../../services/spendy-data.service";

@Component({
    selector: "app-add-expenses",
    templateUrl: "./add-expenses.component.html",
    styleUrls: ["./add-expenses.component.css", "../../../../assets/stylesheets/add_expenses_button.css"],
})
export class AddExpensesComponent implements OnInit {
    constructor(private SpendyDataService: SpendyDataService) {}

    toggler: any = {
        onColor: "danger",
        offColor: "success",
        onText: "Odhodek",
        offText: "Prihodek",
        value: false,
    };

    public Expense = {
        isExpenditure: false,
        cost: 0,
        date: "",
        category_name: "Hrana",
        group: "",
        description: "",
    };

    public izpisi() {}

    public postExpense() {
        console.log(this.Expense);
        this.Expense.group = "5fe087f6fabe4b365c8a7998";
        this.SpendyDataService.postExpense(this.Expense);
    }
    ngOnInit(): void {}
}
