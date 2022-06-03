import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'betterArray',
})
export class BetterArrayPipe implements PipeTransform {
  transform(value: string[]) {
    return value.toString().replace(',', ', ');
  }
}
