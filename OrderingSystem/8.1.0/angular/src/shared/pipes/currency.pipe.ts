import { CurrencyPipe, formatCurrency, getCurrencySymbol } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phpcurrency",
})
export class CurrencyPipeComponent implements PipeTransform {
  /* private currencyPipe: CurrencyPipe = new CurrencyPipe('en-PH','PHP'); */

  /* transform(
    value: any): string {
    return this.currencyPipe.transform(value, 'PHP', 'symbol-narrow', '1-2-2');
  } */

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
