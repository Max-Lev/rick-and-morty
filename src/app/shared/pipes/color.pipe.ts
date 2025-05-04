import { v } from '@angular/cdk/overlay-module.d-b1222156';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'color' })
export class ColorPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string | boolean {
    // console.log(value, args);
    const [arg1,arg2] = args;
    const isIncludesHuman = !(value).includes('Human');
    if((arg1==='locationName' || arg1==='locationDimension' || arg1==='originName' || arg1==='originDimension')
      && value!=='unknown' && value!=='' &&  value!==undefined && value!==null){
      return value = 'white';
      
    }else if(value==='unknown'){
      return value ='red';
    }

    if (arg1 === 'type' && value !== '') {
      return value === 'inherit';
    } 
    else if(arg1==='species' && value !== 'Human' && isIncludesHuman){
      return 'red'
    }
    else {
      // console.log(value,args);
      return value === ''
        || value === null
        || value === undefined
        || value === 'unknown'
        // || value === 'Alien' 
        || value === 'Dead' ? 'red' : 'rgb(85, 204, 68)';
    }

    



  }
}