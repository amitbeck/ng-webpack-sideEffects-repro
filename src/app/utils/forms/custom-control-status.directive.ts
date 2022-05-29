import { Directive, HostBinding, Self } from '@angular/core';
import { NgControl, NgControlStatus } from '@angular/forms';

@Directive({ selector: '[formControlName],[ngModel],[formControl]' })
export class CustomControlStatusDirective extends NgControlStatus {
  // `cd` is used as `private` base class member, so we need to redeclare a class member here
  constructor(@Self() private cd: NgControl) {
    super(cd);
  }

  @HostBinding('class.has-warnings') get hasWarnings(): boolean {
    return Boolean(this.cd?.control?.warnings);
  }
}
