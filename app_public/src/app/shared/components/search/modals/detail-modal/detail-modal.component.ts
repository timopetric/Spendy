import { Component, Input, OnInit } from "@angular/core";
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
        public activeModal: NgbActiveModal
    ) {}

    public message: string;

    @Input() activity: Expense;

    ngOnInit(): void {}

    public openModal(activityData) {
        const modalRef = this.modalService.open(DetailModalUpdateComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.activity = activityData;
    }

    public deleteExpense() {
        this.expensesData
            .deleteExpenseByGroupId(this.activity.groupId, this.activity._id)
            .then(message => {
                console.log(message);
                this.message = message;
                this.activeModal.close({ message, item: this.activity._id });
            })
            .catch(error => {
                this.showError(error);
                this.activeModal.close(error);
            });
    }

    private showError = (napaka: any): void => {
        this.message = napaka.message || napaka;
    };
}
