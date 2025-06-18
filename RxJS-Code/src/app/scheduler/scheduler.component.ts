import { Component } from '@angular/core';
import { asapScheduler, asyncScheduler, Observable, observeOn, queueScheduler } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css',
})
export class SchedulerComponent {
  startSchedulerDemo() {
    const observable = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    })
    // .pipe(observeOn(null));
    // .pipe(observeOn(queueScheduler));
    // .pipe(observeOn(asapScheduler));
    .pipe(observeOn(asyncScheduler));


    console.log('just before subscribe');
    observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');
  }
}
