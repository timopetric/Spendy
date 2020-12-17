import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "mapDictToArray" })
export class MapDictToArrayPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let arr = [];
        for (let key in value) {
            arr.push({ key: key, value: value[key] });
        }
        return arr;
    }
}
