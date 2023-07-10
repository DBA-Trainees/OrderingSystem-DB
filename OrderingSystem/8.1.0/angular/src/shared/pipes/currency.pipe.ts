import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currency',
  })

export class CurrencyPipeComponent implements PipeTransform {
    transform(value: number, currencyCode: string) {
        
    }
}