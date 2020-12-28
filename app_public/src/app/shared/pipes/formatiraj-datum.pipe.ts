import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatirajDatum",
})
export class FormatirajDatumPipe implements PipeTransform {
    transform(nizDatum: Date): unknown {
        const datum = new Date(nizDatum);
        const imenaMesecev = [
            "januar",
            "februar",
            "marec",
            "april",
            "maj",
            "junij",
            "julij",
            "avgust",
            "september",
            "oktober",
            "november",
            "december",
        ];
        const d = datum.getDate();
        const m = imenaMesecev[datum.getMonth()];
        const l = datum.getFullYear();
        return `${d}. ${m}, ${l}`;
    }
}
