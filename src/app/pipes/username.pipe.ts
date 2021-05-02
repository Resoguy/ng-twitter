import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  transform(value: unknown, symbol: string = '@', ...args: unknown[]): unknown {
    return `${symbol}${value}`;
  }

}
