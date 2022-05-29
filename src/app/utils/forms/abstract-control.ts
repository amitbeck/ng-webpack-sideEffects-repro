import { EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControlStatus,
  ValidationErrors,
} from '@angular/forms';

declare module '@angular/forms' {
  interface AbstractControl {
    readonly warnings: ValidationErrors | null;

    setWarnings: (warnings: ValidationErrors | null) => void;

    hasWarning: (
      warningCode: keyof ValidationErrors,
      path?: (string | number)[] | string
    ) => boolean;

    getWarning: (
      warningCode: keyof ValidationErrors,
      path?: (string | number)[] | string
    ) => ValidationErrors[typeof warningCode];
  }
}

/* We use `prototype` in order to extend `AbstractControl` with our custom implementation */

// Set `warnings` even though it's readonly
(AbstractControl.prototype as { warnings: ValidationErrors | null }).warnings =
  null;

AbstractControl.prototype.setWarnings = function (
  warnings: ValidationErrors | null,
  opts: { emitEvent?: boolean } = {}
): void {
  // Set `warnings` even though it's readonly
  (this as { warnings: ValidationErrors | null }).warnings = warnings;

  if (false !== opts.emitEvent) {
    (this.statusChanges as EventEmitter<FormControlStatus>).emit(this.status);
  }
};

AbstractControl.prototype.hasWarning = function (
  warningCode: keyof ValidationErrors,
  path?: (string | number)[] | string
): boolean {
  return Boolean(this.getWarning(warningCode, path));
};

AbstractControl.prototype.getWarning = function (
  warningCode: keyof ValidationErrors,
  path?: (string | number)[] | string
): ValidationErrors[typeof warningCode] {
  const control = path ? this.get(path) : this;

  return control?.warnings?.[warningCode] ?? null;
};

const originalUpdateValueAndValidity =
  AbstractControl.prototype.updateValueAndValidity;
AbstractControl.prototype.updateValueAndValidity = function (
  opts: { onlySelf?: boolean; emitEvent?: boolean } = {}
): void {
  this.setWarnings(null);
  originalUpdateValueAndValidity.call(this, opts);
};
