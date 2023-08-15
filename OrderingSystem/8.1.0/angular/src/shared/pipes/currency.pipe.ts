import { CurrencyPipe, formatCurrency, getCurrencySymbol } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phpcurrency",
})
export class CurrencyPipeComponent implements PipeTransform { 

  transform(
    value: number, 
    currencyCode: string ='PHP',
    display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol',
    digitsInfo: string = '1-2-2'
    ):string | null {
    if (isNaN(value) || currencyCode === null){
      return null;
    }
    return formatCurrency(value, 'PHP', digitsInfo);
  }
}
