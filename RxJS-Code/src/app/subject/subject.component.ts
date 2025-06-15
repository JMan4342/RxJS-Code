import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent {
  firstCallBS: number = 0;
  secondCallBS: number = 0;

  firstCallReplay: any = [];
  secondCallReplay: any = [];

  startBehaviorCalls() {
    const subject = new BehaviorSubject(0);
    let counter = 0;

    subject.subscribe({
      next: (x) => {
        this.firstCallBS = x;
      },
    });

    setInterval(() => {
      subject.next(counter++);
    }, 1000);

    setTimeout(() => {
      subject.subscribe({
        next: (x) => {
          this.secondCallBS = x;
        },
      });
    }, 4000);

    setTimeout(() => {
      subject.unsubscribe();
    }, 10000);
  }

  startReplayCall() {
    const subject = new ReplaySubject(3);
    let counter = 0;

    subject.subscribe({
      next: (x) => {
        console.log(`observerA: ${x}`), this.firstCallReplay.push(x);
        console.log(this.firstCallReplay);
      },
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    setTimeout(() => {
      subject.subscribe({
        next: (x) => {
          console.log(`observerB: ${x}`), this.secondCallReplay.push(x);
          console.log(this.secondCallReplay);
        },
      });
    }, 4000);

    subject.next(5);

    // setTimeout(() => {
    //   subject.unsubscribe();
    // }, 10000);
    // const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

    // subject.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`),
    // });

    // subject.next(1);
    // subject.next(2);
    // subject.next(3);
    // subject.next(4);

    // subject.subscribe({
    //   next: (v) => console.log(`observerB: ${v}`),
    // });

    // subject.next(5);
  }
}
