import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Expense } from "src/app/shared/classes/expense";
import { ExpensesDataService } from "src/app/shared/services/expenses-data.service";
import { DetailModalUpdateComponent } from "../detail-modal-update/detail-modal-update.component";

@Component({
    selector: "app-detail-modal",
    templateUrl: "./detail-modal.component.html",
    styleUrls: ["./detail-modal.component.css"],
})
export class DetailModalComponent implements OnInit {
    constructor(
        private expensesData: ExpensesDataService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private _snackBar: MatSnackBar
    ) {}

    public message: string;
    public outputObj: object;

    @Input() activity: Expense;

    ngOnInit(): void {}

    public openModal(activityData) {
        const modalRef = this.modalService.open(DetailModalUpdateComponent, {
            centered: true,
            size: "lg",
            backdrop: "static",
        });
        modalRef.componentInstance.activity = activityData;

        modalRef.result
            .then(result => {
                if (result.message === "Updating was successful") {
                    this.activity = result.expense;
                    this.outputObj = result;
                    this.openSnackBar(result["message"]);
                }
            })
            .catch(err => {
                this.showError(err);
                this.openSnackBar("Prišlo je do napake pri posodabljanju");
            });
    }

    public deleteExpense() {
        this.expensesData
            .deleteExpenseByGroupId(this.activity.groupId, this.activity._id)
            .then(message => {
                this.outputObj = { message: message["message"], item: this.activity._id };
                this.openSnackBar(message["message"]);
                this.activeModal.close(this.outputObj);
            })
            .catch(error => {
                this.showError(error);
                this.openSnackBar("Prišlo je do napake pri brisanju");
                this.activeModal.close(error);
            });
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, "skrij", {
            duration: 10000,
        });
    }

    private showError = (napaka: any): void => {
        this.message = napaka.message || napaka;
    };
}
