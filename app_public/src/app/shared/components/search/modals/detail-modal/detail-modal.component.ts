import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailModalUpdateComponent } from "../detail-modal-update/detail-modal-update.component";

@Component({
    selector: "app-detail-modal",
    templateUrl: "./detail-modal.component.html",
    styleUrls: ["./detail-modal.component.css"],
})
export class DetailModalComponent implements OnInit {
    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

    @Input() activity;

    ngOnInit(): void {}

    public openModal(activityData) {
        const modalRef = this.modalService.open(DetailModalUpdateComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.activity = activityData;
    }
}
