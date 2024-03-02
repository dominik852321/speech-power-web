import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsMinutes',
  standalone: true
})
export class SecondsMinutesPipe implements PipeTransform {

  transform(totalSeconds: number, ...args: unknown[]): unknown {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}.${seconds} minutes`;
  }

}
