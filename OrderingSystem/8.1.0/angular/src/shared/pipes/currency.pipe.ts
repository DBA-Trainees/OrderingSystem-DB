import { formatCurrency, getCurrencySymbol } from "@angular/common";
import {Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currency",
})
export class CurrencyPipeComponent implements PipeTransform {
  transform(
    value: number,
    currencyCode: string ='PHP',
    display: "code" | "symbol" | "symbol-narrow" | string | boolean = "symbol",
    digitsInfo: "3.2-2",
    locale: string = 'fr'
  ) : string | null{
    return formatCurrency(
      value, 
      locale, 
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo,
      );
  }

}
