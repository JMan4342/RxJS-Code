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
  isWorking: boolean = false;

  startOperators() {
    this.oneSecResult = null;
    this.halfSecResult = null;
    this.isWorking = true;

    const oneSecNum = interval(1000);
    const halfSecNum = interval(500);

    const takeOneTenNumbers = oneSecNum.pipe(take(10));
    const takeHalfTenNumbers = halfSecNum.pipe(take(10));

    // FORKJOIN DEMONSTRATION
    // const observable = forkJoin([takeOneTenNumbers, takeHalfTenNumbers]);
    // observable.subscribe({
    //   next: (value) => {
    //     this.oneSecResult = value[0];
    //     this.halfSecResult = value[1];
    //   },
    //   complete: () => this.isWorking = false,
    // });

    // COMBINELATEST DEMONSTRATION
    const observable = combineLatest([takeOneTenNumbers, takeHalfTenNumbers]);
    observable.subscribe({
      next: (value) => {
        this.oneSecResult = value[0];
        this.halfSecResult = value[1];
      },
      complete: () => (this.isWorking = false),
    });
  }
}
