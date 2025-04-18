import { v } from '@angular/cdk/overlay-module.d-b1222156';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'color' })
export class ColorPipe implements PipeTransform {
  transform(value: string, args?: string): string | boolean {
    console.log('value:',value,'args:',args);
    if (args === 'type' && value !== '') {
      return value === 'inherit';
    } else {
      return value === '' || value === 'unknown' || value === 'Alien' || 
      value === 'Dead' ? 'red' : 'rgb(85, 204, 68)';
      // value === 'Dead' ? 'red' : 'green';
    }
  }
}