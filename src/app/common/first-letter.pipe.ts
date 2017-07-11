import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? value.length ? value[0] : '' : '';
  }
}
