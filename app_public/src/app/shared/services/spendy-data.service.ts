import { Injectable, OnInit } from "@angular/core";
import { User } from "../classes/user.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: "root",
})
export class SpendyDataService {
    constructor(private http: HttpClient) {}

    public getExpenses(skupinaId): any {
        return this.http
            .get(`${API_URL}/groups/${skupinaId}/expenses?isExpenditure=true&date=desc`)
            .toPromise()
            .then((responseExpenses: any) => {
                let expenses = responseExpenses.expenses;
                this.http
                    .get(`${API_URL}/groups/${skupinaId}/expenses?isExpenditure=false&date=desc`)
                    .toPromise()
                    .then((responseIncome: any) => {
                        let income = responseIncome.expenses;
                        return { income: income, expenses: expenses };
                    });
            });
    }

    public postExpense(Expense) {
        let data = JSON.stringify(Expense);
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: "my-auth-token",
            }),
        };

        console.log(Expense.group);
        return this.http
            .post(`${API_URL}/groups/${Expense.group}/expenses)`, data, httpOptions)
            .toPromise()
            .then(res => {
                console.log("Adding Expense succesful");
                console.log(Expense);
            })
            .catch(napaka => {
                console.log(napaka);
            });
    }
}
