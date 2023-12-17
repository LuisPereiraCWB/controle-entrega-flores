import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function apenasLetras(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const nomeValue = control.value;
    const apenasLetrasRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/;

    console.log('nomeValue: ' + nomeValue);
    return of(apenasLetrasRegex.test(nomeValue)).pipe(
      map(isValid => (isValid ? null : { 'apenasLetras': true })),
      catchError(() => of(null))
    );
  };
}

export function apenasNumeros(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const cpfValue = control.value;
    const apenasNumerosRegex = /^\d+$/;

    console.log('cpfValue: ' + cpfValue);
    return of(apenasNumerosRegex.test(cpfValue)).pipe(
      map(isValid => (isValid ? null : { 'apenasNumeros': true })),
      catchError(() => of(null))
    );
  };
}


