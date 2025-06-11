import { Component } from '@angular/core';
import { combineLatest, forkJoin, interval, take } from 'rxjs';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css',
})
export class OperatorsComponent {
  oneSecResult: number | null = null;
  halfSecResult: number | null = null;
  completeMessage: string = '';
  isWorking: boolean = false;

  startOperators() {
    this.oneSecResult = null;
    this.halfSecResult = null;
    this.completeMessage = '';
    this.isWorking = true;

    const oneSecNum = interval(1000);
    const twoSecNum = interval(2000);

    const takeOneFiveNumbers = oneSecNum.pipe(take(5));
    const takeTwoFiveNumbers = twoSecNum.pipe(take(5));

    // NO OPERATORS DEMONSTRATION
    // takeOneFiveNumbers.subscribe(x => this.oneSecResult = x);
    // takeTwoFiveNumbers.subscribe(x => this.halfSecResult = x);

    // this.completeMessage = 'No Join Creation Operators Complete';
    // this.isWorking = false;

    // FORKJOIN DEMONSTRATION
    // const observable = forkJoin([takeOneFiveNumbers, takeTwoFiveNumbers]);
    // observable.subscribe({
    //   next: (value) => {
    //     this.oneSecResult = value[0];
    //     this.halfSecResult = value[1];
    //   },
    //   complete: () => {
    //     this.isWorking = false;
    //     this.completeMessage = 'Forkjoin Operator Completed';
    //   },
    // });

    // COMBINELATEST DEMONSTRATION
    const observable = combineLatest([takeOneFiveNumbers, takeTwoFiveNumbers]);
    observable.subscribe({
      next: (value) => {
        this.oneSecResult = value[0];
        this.halfSecResult = value[1];
      },
      complete: () => {
        this.isWorking = false;
        this.completeMessage = 'CombineLatest Operator Completed';
      },
    });
  }
}
