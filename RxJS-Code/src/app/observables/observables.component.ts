import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent {
  observableMessage: string = '';
  counter: number = 0;
  counter2: number = 0;

  counter$ = new Observable<number>();

  ngOnInit(): void {

    // OBSERVABLE BEING CREATED
    const message$ = new Observable<string>((subscriber) => {
      setTimeout(() => {
        subscriber.next('Welcome Everyone To...');
      });
      setTimeout(() => {
        subscriber.next('Observables');
      }, 3000);
    });

    // OBSERVABLE BEING SUBSCRIBED AND EXECUTED
    message$.subscribe({
      next: (returnedVal) => {
        this.observableMessage = returnedVal;
      },
      error: (err) => console.log('Something went wrong'),
    });

  }

  startCounter() {
    this.counter = 0;
    this.counter2 = 0;

    // THIS IS THE OBSERVABLE FOR THE COUNTER
    this.counter$ = new Observable<number>((subscriber) => {
      setInterval(() => {
        subscriber.next(this.counter + 1);
      }, 1500);
    });

    // THIS IS THE OBSERVER FOR THE COUNTER
    const counterObserer = {
      next: (x: number) => (this.counter = x),
      error: (err: string) => console.log('Something went wrong: ' + err),
    };

    const counterObserver2 = {
      next: (x: number) => (this.counter2 = x + 1),
      error: (err: string) => console.log('Something went wrong: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    }

    // THIS IS THE SUBSCRIPTION FOR THE COUNTER
    const demoCounter = this.counter$.subscribe(counterObserer);
    const demoCounter2 = this.counter$.subscribe(counterObserver2);

    setTimeout(() => {
      demoCounter2.unsubscribe();
      this.observableMessage = 'Counter ended';
    }, 10000)
  }
}
