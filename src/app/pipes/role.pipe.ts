import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return JSON.stringify(value, null, 2).replaceAll("\"", "");
  }

}
