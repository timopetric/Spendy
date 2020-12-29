import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-detail-modal-update",
    templateUrl: "./detail-modal-update.component.html",
    styleUrls: ["./detail-modal-update.component.css"],
})
export class DetailModalUpdateComponent implements OnInit {
    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

    @Input() activity;

    ngOnInit(): void {}
}
