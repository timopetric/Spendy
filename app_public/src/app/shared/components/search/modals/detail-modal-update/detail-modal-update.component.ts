import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Expense } from "src/app/shared/classes/expense";
import { ExpensesDataService } from "src/app/shared/services/expenses-data.service";

@Component({
    selector: "app-detail-modal-update",
    templateUrl: "./detail-modal-update.component.html",
    styleUrls: ["./detail-modal-update.component.css"],
})
export class DetailModalUpdateComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private expensesData: ExpensesDataService
    ) {}

    @Input() activity: Expense;

    activityForm = new FormGroup({
        description: new FormControl(""),
        cost: new FormControl(""),
        category_name: new FormControl(""),
        isExpenditure: new FormControl(""),
    });

    ngOnInit(): void {
        this.activityForm.patchValue({
            description: this.activity.description,
            cost: this.activity.cost,
            category_name: this.activity.category_name,
            isExpenditure: this.activity.isExpenditure,
        });
    }

    public submit() {
        console.log(this.activityForm.value);
        this.expensesData
            .updateExpenseInGroup(this.activity.groupId, this.activity._id, this.activityForm.value)
            .then(result => {
                this.activeModal.close({ message: result["message"], expense: result["expense"] });
            })
            .catch(error => {});
    }
}
