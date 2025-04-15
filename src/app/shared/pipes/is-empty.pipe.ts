import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEmpty'
})
export class IsEmptyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value===''){
      return '-x-'
    }
    return value;
  }

}
