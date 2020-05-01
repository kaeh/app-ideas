import { AbstractControl } from '@angular/forms';

export type FormModel<T> = {
  [P in keyof T]?: AbstractControl;
};
