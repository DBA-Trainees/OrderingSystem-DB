import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FoodDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'abp-modal-header',
  templateUrl: './abp-modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbpModalHeaderComponent extends AppComponentBase {
  food: FoodDto = new FoodDto();
  @Input() title: string;

  @Output() onCloseClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
