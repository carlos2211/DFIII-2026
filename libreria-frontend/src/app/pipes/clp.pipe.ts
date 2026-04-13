import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clp',
  standalone: false
})
export class ClpPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    return  Math.round(value).toLocaleString('es-CL');
  }
}