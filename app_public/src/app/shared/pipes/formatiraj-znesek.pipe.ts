import { Pipe, PipeTransform } from "@angular/core";
import { Expense } from "../classes/expense";

@Pipe({
    name: "formatirajZnesek",
})
export class FormatirajZnesekPipe implements PipeTransform {
    transform(activity: Expense): unknown {
        const predznak = activity.isExpenditure ? "-" : "";

        return `${predznak} ${activity.cost} €`;
    }
}
