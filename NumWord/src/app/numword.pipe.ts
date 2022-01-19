import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "numword",
  pure: true
})
export class NumWordPipe implements PipeTransform {
  transform(num: string, word1: string, word24: string, word059: string): string {
    if (isNaN(parseInt(num)) || parseInt(num) < 0)
      return `нет ${word059}`;

    let dd: number = parseInt(num) % 100;
    if (dd >= 11 && dd <= 19)
      return `${num} ${word059}`;

    let d: number = parseInt(num) % 10;
    if (d === 1)
      return `${num} ${word1}`;

    if (d >= 2 && d <= 4)
      return `${num} ${word24}`;

    return `${num} ${word059}`;
  }
}
