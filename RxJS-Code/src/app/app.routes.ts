import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';
import { ObservablesComponent } from './observables/observables.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
    {
    path: 'observables',
    component: ObservablesComponent,
  },
  {
    path: 'operators',
    component: OperatorsComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
