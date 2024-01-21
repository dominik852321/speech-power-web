import { ChangeDetectorRef, Directive } from '@angular/core';

@Directive({
  selector: '[appBaseDirective]',
  standalone: true
})
export class BaseDirective {
  constructor(public changeDetectorRef: ChangeDetectorRef) {}

}
