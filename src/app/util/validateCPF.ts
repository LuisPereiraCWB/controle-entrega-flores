import { AbstractControl } from '@angular/forms';

const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;

export function validateCPF(control: AbstractControl){
  if(control.value.match(cpfRegex)){
    return { validNum: true };
  }
  return null;
}
