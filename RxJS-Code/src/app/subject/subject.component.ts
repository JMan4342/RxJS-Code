import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent {
  firstCallBS: number = 0;
  secondCallBS: number = 0;

  startBehaviorCalls() {
    const subject = new BehaviorSubject(0);
    let counter = 0;

    subject.subscribe({
      next: (x) => {
        this.firstCallBS = x;
      },
    });

    setInterval(() => {
      subject.next(counter += 1);
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
    }, 10000)
  }
}
