import { Pipe, PipeTransform } from '@angular/core';
import { uniqBy } from 'lodash-es';

@Pipe({
  name: 'unique'
})

export class UniquePipe implements PipeTransform{
    transform(value: any): any{
        if(value!== undefined && value!== null){
            return uniqBy(value, 'name');
        }
        return value;
    }
}