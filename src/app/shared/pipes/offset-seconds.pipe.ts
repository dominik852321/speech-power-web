import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offsetSeconds',
  standalone: true,
})
export class OffsetSecondsPipe implements PipeTransform {
  transform(totalSeconds: number, ...args: unknown[]): unknown {
    const rounded = Math.round(totalSeconds);
    const minutes = Math.floor(rounded / 60);
    const seconds = rounded % 60;
    return `${minutes > 10 ? minutes : '0' + minutes}:${
      seconds > 10 ? seconds : '0' + seconds
    }`;
  }
}
