import { AbstractControlDirective, ValidationErrors } from '@angular/forms';

declare module '@angular/forms' {
  interface AbstractControlDirective {
    readonly warnings: ValidationErrors | null;

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

/* We use `prototype` in order to extend `AbstractControlDirective` with our custom implementation */

Object.defineProperty(AbstractControlDirective.prototype, 'warnings', {
  get: function (this: AbstractControlDirective) {
    return this.control?.warnings;
  },
});

AbstractControlDirective.prototype.hasWarning = function (
  warningCode: keyof ValidationErrors,
  path?: (string | number)[] | string
): boolean {
  return Boolean(this.getWarning(warningCode, path));
};

AbstractControlDirective.prototype.getWarning = function (
  warningCode: keyof ValidationErrors,
  path?: (string | number)[] | string
): ValidationErrors[typeof warningCode] {
  return this.control?.getWarning(warningCode, path) ?? null;
};
