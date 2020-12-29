import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
    name: "changeColor",
})
export class ChangeColorPipe implements PipeTransform {
    private sanitizer: any;
    transform(stSkupin: any) {
        const vString = stSkupin.toString();
        const makeHTTMLRed: string = `<span class="red">Število skupin</span>`;
        const makeHTTMLGreen: string = '<div class="green">Število skupin</div>';
        const makeHTTMLOrange: string = '<div class="orange">Število skupin</div>';
        // const makeHTTML2: string = "<span style='color': red">${stSkupin}</span>`;
        // const makeHTTML2: string = '<span style="color: red">*</span>';
        // const makeHTTML3: string = "<span style='background-color: #1c7430'><strong>NEKEJ</strong></span>";
        if (stSkupin <= 3) {
            // return "<span style='color: greenyellow' class='red'>Število skupindsdss</span>";
            return vString.replace(`${vString}`, makeHTTMLRed);
            // return this.sanitizer.bypassSecurityTrustHtml(
            //     `<span id="blablabla" style="color: greenyellow">Število skupin</span>`
            // );
        } else if (stSkupin > 3 && stSkupin < 10) {
            return vString.replace(`${vString}`, makeHTTMLGreen);
        } else {
            // return `<span id="blablabla" style="color: greenyellow">Število skupin</span>`
            return vString.replace(`${vString}`, makeHTTMLOrange);
        }
    }
}
