// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'isEmpty'
// })
// export class IsEmptyPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     if(value===''){
//       return '-x-'
//     }
//     return value;
//   }

// }

import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'isEmpty',
})
export class IsEmptyPipe implements PipeTransform {

  sanitizer = inject(DomSanitizer)
  transform(value: unknown, ...args: unknown[]): unknown {

    const [arg1, arg2] = args;
    
    const isDeadOrEmpty = value === '' || value === null || value === undefined || value === 'Dead';
    const isAlive = value === 'Alive' || value == 'Alive';

    if (isDeadOrEmpty) {
      if (arg2 === 'status') {
        return this.sanitizer.bypassSecurityTrustHtml(
          `<span style="font-size: x-large;">☠️</span>`); // Dead or missing status
      }
      else {
        return '❌'; // General fallback
      }
    }

    if (isAlive) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span style="font-size: x-large;">♥️</span>`); // ALIVE
    }

    const isOriginDimension = value === '' || value === null || value === undefined || value === 'unknown';
    if (arg2 === 'originDimension') {
      if (isOriginDimension) {
        return '❌';
      } else {
        return value;
      }
    }

    return value;
  }

}
