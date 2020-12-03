import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlBreakLines',
})
export class HtmlBreakLinesPipe implements PipeTransform {
    transform(text: string): string {
        return text.replace(/\n/g, '<br>');
    }
}
