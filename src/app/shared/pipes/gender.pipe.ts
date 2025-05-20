import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string | boolean {
    if(value==='Male' || value==='Female'){
      return value = 'white';
    }
    else{
      return value='red';
    }
    
  }

}
