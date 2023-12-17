import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidade',
})
export class UnidadePipe implements PipeTransform {
  transform(valor: number, unidade: string = ''): string {
    return `${valor} ${unidade}`;
  }
}
