import { Component } from '@angular/core';
import {
  catchError,
  combineLatest,
  forkJoin,
  interval,
  map,
  Observable,
  of,
  take,
} from 'rxjs';

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

  ngOnInit(): void {
    of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => {
          if (n == 4) {
            throw 'Four';
          }
          return n;
        }),
        catchError((err) => {
          throw 'error in source. Require number. Details: ' + err;
        })
      )
      .subscribe({
        next: (returnedVal) => {
          console.log(returnedVal);
        },
        error: (err) => console.log('Something went wrong.' + err),
      });
  }

  startOperators(operator: string) {
    this.oneSecResult = null;
    this.halfSecResult = null;
    this.completeMessage = '';
    this.isWorking = true;

    const oneSecNum = interval(1000);
    const twoSecNum = interval(2000);

    const takeOneFiveNumbers = oneSecNum.pipe(take(5));
    const takeTwoFiveNumbers = twoSecNum.pipe(take(5));

    if (operator == 'none') {
      this.noCombineOperators(takeOneFiveNumbers, takeTwoFiveNumbers);
    }

    if (operator == 'forkJoin') {
      this.forkJoinOperators(takeOneFiveNumbers, takeTwoFiveNumbers);
    }

    if (operator == 'combineLatest') {
      this.combineLatestOperators(takeOneFiveNumbers, takeTwoFiveNumbers);
    }

  }

  noCombineOperators(
    takeOneFiveNumbers: Observable<number>,
    takeTwoFiveNumbers: Observable<number>
  ) {
    takeOneFiveNumbers.subscribe((x) => (this.oneSecResult = x));
    takeTwoFiveNumbers.subscribe((x) => (this.halfSecResult = x));

    this.completeMessage = 'No Join Creation Operators Complete';
    this.isWorking = false;
  }

  forkJoinOperators(
    takeOneFiveNumbers: Observable<number>,
    takeTwoFiveNumbers: Observable<number>
  ) {
    const observable = forkJoin([takeOneFiveNumbers, takeTwoFiveNumbers]);
    observable.subscribe({
      next: (value) => {
        this.oneSecResult = value[0];
        this.halfSecResult = value[1];
      },
      complete: () => {
        this.isWorking = false;
        this.completeMessage = 'Forkjoin Operator Completed';
      },
    });
  }

  combineLatestOperators(
    takeOneFiveNumbers: Observable<number>,
    takeTwoFiveNumbers: Observable<number>
  ) {
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
