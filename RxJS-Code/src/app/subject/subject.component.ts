import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AsyncSubject,
  BehaviorSubject,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent {
  firstCallSub: number = 0;
  secondCallSub: number = 0;

  firstCallBS: number = 0;
  secondCallBS: number = 0;

  firstCallReplay: any[] = [];
  secondCallReplay: any[] = [];
  firstInputReplay: any[] = [];
  secondInputReplay: any[] = [];
  searchInput: string = '';

  firstCallAsync: number = 0;
  secondCallAsync: number = 0;
  asyncMessage: string = '';
  asyncLoading: boolean = false;

  startSubjectCalls() {
    const subject = new Subject<number>();
    let counter = 0;

    subject.subscribe({
      next: (x) => (this.firstCallSub = x),
    });
    subject.subscribe({
      next: (x) => (this.secondCallSub = x),
    });

    setInterval(() => {
      subject.next(counter++);
    }, 1000);

    setTimeout(() => {
      subject.unsubscribe();
    }, 10000);
  }

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
    }, 1500);

    setTimeout(() => {
      subject.subscribe({
        next: (x) => {
          this.secondCallBS = x;
        },
      });
    }, 6000);

    setTimeout(() => {
      subject.unsubscribe();
    }, 12000);
  }

  startReplayCall() {
    const subject = new ReplaySubject(2);

    subject.subscribe({
      next: (x) => {
        console.log(`observerA: ${x}`), this.firstCallReplay.push(x);
        console.log(this.firstCallReplay);
      },
    });

    setTimeout(() => {
      subject.next(1);
    }, 1500);
    setTimeout(() => {
      subject.next(2);
    }, 3000);
    setTimeout(() => {
      subject.next(3);
    }, 4500);
    setTimeout(() => {
      subject.next(4);
    }, 6000);
    // subject.next(1);
    // subject.next(2);
    // subject.next(3);
    // subject.next(4);

    // of(1, 2, 3, 4).subscribe({
    //   next: (x) => subject.next(x),
    // });

    setTimeout(() => {
      subject.subscribe({
        next: (x) => {
          console.log(`observerB: ${x}`), this.secondCallReplay.push(x);
          console.log(this.secondCallReplay);
        },
      });
    }, 7000);

    setTimeout(() => {
      subject.next(5);
    }, 7500);
    setTimeout(() => {
      subject.next(6);
    }, 9000);
    // subject.next(5);
    // subject.next(6);
    // of(5, 6).subscribe({
    //   next: (x) => subject.next(x),
    // });
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
