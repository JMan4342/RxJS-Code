import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
