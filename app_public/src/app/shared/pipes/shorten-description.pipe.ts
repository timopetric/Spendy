import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "shortenDescription",
})
export class ShortenDescriptionPipe implements PipeTransform {
    transform(text: string): string {
        let result = "";
        text.length > 30 ? (result = text.slice(0, 30) + "...") : (result = text);
        return result;
    }
}
