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

  ngOnInit(): void {
    const message = new Observable<string>((subscriber) => {
      subscriber.next('Welcome Everyone To...');
      setTimeout(() => {
        subscriber.next('Observables');
      }, 3000);
    });

    message.subscribe({
      next: (x) => {
        this.observableMessage = x;
      },
      error: (err) => console.log('Something went wrong'),
    });
  }

  
}
