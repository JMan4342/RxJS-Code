import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';

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

  firstCallAsync: number = 0;
  secondCallAsync: number = 0;
  asyncMessage: string = '';
  asyncLoading: boolean = false;

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
  }

  startAsyncCall() {
    const subject = new AsyncSubject<number>();
    let counter = 0;
    this.asyncMessage = '';
    this.asyncLoading = true;

    subject.subscribe({
      next: (x) => {
        this.firstCallAsync = x;
      },
    });

    setInterval(() => {
      subject.next(counter++);
    }, 1000);

    setTimeout(() => {
      subject.subscribe({
        next: (x) => {
          this.secondCallAsync = x;
        },
      });
    }, 4000);

    setTimeout(() => {
      subject.complete();
      this.asyncMessage = 'AsyncSubject Complete';
      this.asyncLoading = false;
    }, 10000);
  }
}
