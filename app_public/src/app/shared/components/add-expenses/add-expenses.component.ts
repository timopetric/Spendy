import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpendyDataService } from "../../services/spendy-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { addExpense } from "../../classes/addExpense";
import { GroupsDataService } from "../../services/groups-data.service";
import { AuthenticationService } from "../../services/authentication.service";
import { GroupsPopulatedUsersModel } from "../../classes/groups-populated-users.model";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-add-expenses",
    templateUrl: "./add-expenses.component.html",
    styleUrls: ["./add-expenses.component.css", "../../../../assets/stylesheets/add_expenses_button.css"],
})
export class AddExpensesComponent implements OnInit, OnDestroy {
    constructor(
        private SpendyDataService: SpendyDataService,
        private _snackBar: MatSnackBar,
        private expensesData: ExpensesDataService,
        private groupsDataService: GroupsDataService,
        private authenticationService: AuthenticationService,
        private titleService: Title
    ) {
        this.titleService.setTitle("Poišči aktivnosti");
    }
    private userGroupsDataSub: Subscription;
    public selectedGroupId = null;

    getIdFromToken() {
        let { _id } = this.authenticationService.vrniTrenutnegaUporabnika();
        // return "5fc44bd3f35a902b3000803c"; // todo: get from token
        return _id || "";
    }
    userGroupsData: GroupsPopulatedUsersModel[] = [];

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
        group: null,
        description: "",
        created_by: this.getIdFromToken(),
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
            created_by: this.getIdFromToken(),
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
        this.Expense.group = this.selectedGroupId;
        console.log(this.Expense);
        if (this.isFilled()) {
            this.expensesData.addExpenseToGroup(this.Expense.group, this.Expense).then(res => {
                this.ponastavi();
                this.openSnackBar("Expense uspešno dodan!!!");
            });
        }
    }

    ngOnInit(): void {
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: GroupsPopulatedUsersModel[] }) => {
                this.userGroupsData = data.groups;
                this.selectedGroupId = this.userGroupsData[0]._id;
            });
        this.groupsDataService.getGroupsByUser();
    }
    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
    }
}
