import { Routes } from '@angular/router';
import {
  MasterdataDashboardComponent,
  MasterdatasDetailsComponent,
  MasterdatasEditFormComponent,
  MasterdatasListComponent,
  MasterdataTypeDetailsComponent,
  MasterdataTypeEditFormComponent,
  MasterdataTypeListComponent,
} from './components';

export const masterdataRoutes: Routes = [
  {
    path: '',
    component: MasterdataDashboardComponent,
  },
  {
    path: 'type',
    component: MasterdataTypeListComponent,
    children: [
      { path: 'details/:id', component: MasterdataTypeDetailsComponent },
      { path: 'add', component: MasterdataTypeEditFormComponent },
      { path: 'edit/:id', component: MasterdataTypeEditFormComponent },
    ],
  },
  {
    path: 'masterdatas',
    component: MasterdatasListComponent,
    children: [
      { path: 'add', component: MasterdatasEditFormComponent },
      { path: ':typeId/add', component: MasterdatasEditFormComponent },
      { path: ':typeId', component: MasterdatasListComponent },
      { path: 'details/:typeId/:id', component: MasterdatasDetailsComponent },
      { path: ':typeId/edit/:id', component: MasterdatasEditFormComponent },
    ],
  },
];
