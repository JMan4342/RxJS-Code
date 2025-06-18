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

    // setTimeout(() => {
    // this.observableMessage = 'Start Message'
    // }, 1000);

    // OBSERVABLE BEING SUBSCRIBED AND EXECUTED
    message$.subscribe({
      next: (x) => {
        this.observableMessage = x;
      },
      error: (err) => console.log('Something went wrong'),
    });

    // setTimeout(() => {
    //   this.observableMessage = 'End Message';
    // }, 2500);

  }

  startCounter() {
    this.counter = 0;

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

    // THIS IS THE SUBSCRIPTION FOR THE COUNTER
    const demoCounter = this.counter$.subscribe(counterObserer);

    setTimeout(() => {
      demoCounter.unsubscribe();
      this.observableMessage = 'Counter ended';
    }, 10000)
  }
}
