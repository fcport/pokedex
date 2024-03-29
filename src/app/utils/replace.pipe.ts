import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, strToReplace: string, replaceWith: string) {
    return value.replace(strToReplace, replaceWith);
  }
}
