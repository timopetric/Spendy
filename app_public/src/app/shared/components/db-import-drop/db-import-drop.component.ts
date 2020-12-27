import { Component, OnInit } from "@angular/core";
import { SpendyDataService } from "../../services/spendy-data.service";

@Component({
    selector: "app-db-import-drop",
    templateUrl: "./db-import-drop.component.html",
    styleUrls: ["./db-import-drop.component.css", "../../../../assets/stylesheets/first-pages.css"],
})
export class DbImportDropComponent implements OnInit {
    constructor(private spendyDataService: SpendyDataService) {}

    ngOnInit(): void {}

    message = "";
    loading = false;

    getImport() {
        this.loading = true;
        this.spendyDataService
            .getImportDatabase()
            .then(resp => this.handleResp(resp))
            .catch(resp => this.handleResp(resp));
    }
    getDrop() {
        this.loading = true;
        this.spendyDataService
            .getDropDatabase()
            .then(resp => this.handleResp(resp))
            .catch(resp => this.handleResp(resp));
    }

    handleResp(resp) {
        this.message = JSON.stringify(resp);
        this.loading = false;
    }
}
