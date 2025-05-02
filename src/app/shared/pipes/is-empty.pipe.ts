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
    const isAlive = value === 'Alive';
    if (isDeadOrEmpty) {
      if (arg2 === 'status') {
        return this.sanitizer.bypassSecurityTrustHtml(
          `<span style="font-size: x-large;">☠️</span>`); // Dead or missing status
      } else {
        return '❌'; // General fallback
      }
    }
    else if (isAlive) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span style="font-size: x-large;">♥️</span>`); // ALIVE
    }

    return value;
  }

}
