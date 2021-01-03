import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpendyDataService } from "../../services/spendy-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExpensesDataService } from "../../services/expenses-data.service";
import { addExpense } from "../../classes/addExpense";
import { GroupsDataService } from "../../services/groups-data.service";
import { AuthenticationService } from "../../services/authentication.service";
import { GroupsPopulatedUsersModel } from "../../classes/groups-populated-users.model";
import { Observable, Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { Title } from "@angular/platform-browser";
import { Categories } from "../../classes/categories";

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
    private groupSelectionSub: Subscription;
    public selectedGroupId = "";

    categories = [];
    filteredCategories: Observable<string[]>;
    myControl = new FormControl();

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.categories.filter(options => options.toLowerCase().indexOf(filterValue) === 0);
    }

    getIdFromToken() {
        let { _id } = this.authenticationService.vrniTrenutnegaUporabnika();
        return _id || "";
    }
    userGroupsData: GroupsPopulatedUsersModel[] = [];

    public dateError = false;
    public costError = false;
    public descriptionError = false;
    public categoryError = false;

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
        category_name: "",
        group: null,
        description: "",
        created_by: this.getIdFromToken(),
    };

    public ponastavi() {
        this.isFilled();
        this.categoryError = false;
        this.Expense = {
            isExpenditure: false,
            cost: 0,
            date: null,
            category_name: "",
            group: "",
            description: "",
            created_by: this.getIdFromToken(),
        };
    }
    public isGood() {
        let categoryRegExp = RegExp("^[A-Za-zčćžđšČĆŽĐŠ0-9 ]{3,25}$");
        let descriptionRegExp = RegExp("^[A-Za-zčćžđšČĆŽĐŠ0-9 ]{3,130}$");
        if (this.Expense.cost !== 0) this.costError = false;
        if (!descriptionRegExp.test(this.Expense.description)) this.descriptionError = false;
        if (!categoryRegExp.test(this.Expense.category_name)) this.categoryError = false;
        if (this.Expense.date !== null) this.dateError = false;
        return !(this.costError || this.descriptionError || this.dateError || this.categoryError);
    }

    private isFilled() {
        let categoryRegExp = RegExp("^[A-Za-zčćžđšČĆŽĐŠ0-9 ]{3,25}$");
        let descriptionRegExp = RegExp("^[A-Za-zčćžđšČĆŽĐŠ0-9 ]{3,130}$");
        this.Expense.cost == 0 ? (this.costError = true) : (this.costError = false);
        this.categoryError = !categoryRegExp.test(this.Expense.category_name);
        this.descriptionError = !descriptionRegExp.test(this.Expense.description);
        Math.floor(this.Expense.cost * 100) / 100 == 0 ? (this.costError = true) : (this.costError = false);
        this.Expense.date == null ? (this.dateError = true) : (this.dateError = false);
        return !(this.costError || this.descriptionError || this.dateError || this.categoryError);
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 5000,
        });
    }

    public postExpense() {
        let categoryname = this.Expense.category_name;
        this.Expense.group = this.selectedGroupId;
        if (this.isFilled()) {
            categoryname = categoryname[0].toUpperCase() + categoryname.slice(1).toLowerCase();
            this.groupsDataService.addCategory(this.Expense.group, categoryname).then(() => {
                this.categories.push(categoryname);
                this.updateCategories();
            });
            this.expensesData.addExpenseToGroup(this.Expense.group, this.Expense).then(res => {
                this.ponastavi();
                this.openSnackBar("Expense uspešno dodan!!!");
            });
        }
    }

    public updateCategories() {
        this.filteredCategories = this.myControl.valueChanges.pipe(
            startWith(""),
            map(value => this._filter(value))
        );
    }

    getCategoriesForSelectedGroup(selectedGroupid: string) {
        this.groupsDataService.getCategoriesOfGroup(selectedGroupid).then(categoriesObj => {
            console.log(categoriesObj);
            this.categories = categoriesObj.categories;
            console.log(this.categories);
            this.updateCategories();
        });
    }

    ngOnInit(): void {
        this.userGroupsDataSub = this.groupsDataService
            .getUserGroupsUpdateListener()
            .subscribe((data: { message: string; groups: GroupsPopulatedUsersModel[] }) => {
                this.userGroupsData = data.groups;
            });

        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.selectedGroupId = data;
            this.getCategoriesForSelectedGroup(data);
        });
        // this.groupsDataService.getGroupsByUser();
    }
    ngOnDestroy() {
        this.userGroupsDataSub.unsubscribe();
        this.groupSelectionSub.unsubscribe();
    }
}
