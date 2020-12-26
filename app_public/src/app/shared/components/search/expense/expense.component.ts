import { Component, Input, OnInit } from "@angular/core";
import { Expense } from "../../classes/expense";

@Component({
    selector: "app-expense",
    templateUrl: "./expense.component.html",
    styleUrls: ["./expense.component.css"],
})
export class ExpenseComponent implements OnInit {
    @Input() aktivnost: Expense;

    constructor() {}

    ngOnInit(): void {}
}
