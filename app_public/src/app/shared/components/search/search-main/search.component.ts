import { Component, OnDestroy, OnInit } from "@angular/core";
import { Expense } from "../../../classes/expense";
import { ExpensesDataService } from "../../../services/expenses-data.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { GroupsDataService } from "../../../services/groups-data.service";
import { Subscription } from "rxjs";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailModalComponent } from "../modals/detail-modal/detail-modal.component";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit, OnDestroy {
    constructor(
        private expensesData: ExpensesDataService,
        private groupsDataService: GroupsDataService,
        private modalService: NgbModal,
        private titleService: Title
    ) {
        this.titleService.setTitle("Stroški");
    }

    private groupSelectionSub: Subscription;
    public groupSelected = "";

    public expenses: Expense[];
    public message: string;
    public p: number = 1;
    public count: number;

    public query: string = "";
    public search: string = "";
    public searchq: string = "";
    ngOnInit(): void {
        this.groupSelectionSub = this.groupsDataService.getGroupSelectionUpdateListener().subscribe((data: string) => {
            this.groupSelected = data;
            this.p = 1;
            this.getExpensesByGroupId(data);
        });
        // this.groupsDataService.getCurrentGroup();
    }

    ngOnDestroy(): void {
        this.groupSelectionSub.unsubscribe();
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
        this.getExpensesByGroupId(this.groupSelected);
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

        this.getExpensesByGroupId(this.groupSelected);
    }

    public openModal(activityData) {
        const modalRef = this.modalService.open(DetailModalComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.activity = activityData;
        modalRef.result.then(result => {
            if (result.message.message === "Deleting was successful") {
                this.expenses = this.expenses.filter(item => item._id !== result.item);
                console.log(this.expenses);
            }
        });
    }

    private showError = (napaka: any): void => {
        this.message = napaka.message || napaka;
    };
}
