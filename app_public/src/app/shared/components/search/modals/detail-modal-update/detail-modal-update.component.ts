import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Expense } from "src/app/shared/classes/expense";
import { ConnectionService } from "src/app/shared/services/connection.service";
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
        private expensesData: ExpensesDataService,
        private connectionService: ConnectionService
    ) {}

    @Input() activity: Expense;
    //prettier-ignore
    public activityForm = new FormGroup(
        {
            description: new FormControl("", {validators:[
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(240),
                Validators.pattern("([a-zA-Z0-9,.\\-\\&\\? ]+)"),
            ],updateOn: "blur"}),
            cost: new FormControl("", {
                validators: [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(16),
                    Validators.pattern("[0-9]+\.*[0-9]{1,2}"),
                ],
                updateOn: "blur",
            }),
            category_name: new FormControl("", {
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(64),
                    Validators.pattern("([a-zA-Z0-9,.\\-\\&\\? ]+)"),
                ],
                updateOn: "blur",
            }),
            isExpenditure: new FormControl(""),
        },
        { updateOn: "change" }
    );

    costError = "Cena mora biti številka in krajša od 16 znakov";
    descriptionError =
        "Description mora biti med dolg vsaj 3 znake in krajši od 240 in nesme vsebovati posebnih znakov";
    categoryError = "Kategorija mora biti  dolga vsaj 3 znake in krajša od 64 in nesme vsebovati posebnih znakov";

    ngOnInit(): void {
        this.activityForm.patchValue({
            description: this.activity.description,
            cost: this.activity.cost,
            category_name: this.activity.category_name,
            isExpenditure: this.activity.isExpenditure,
        });

        //this.activityForm.get("cost")
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

    jePovezava(): boolean {
        return this.connectionService.isOnline;
    }
}
