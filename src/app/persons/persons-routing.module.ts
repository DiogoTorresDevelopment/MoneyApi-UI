import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonRegisterComponent } from './person-register/person-register.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  {
    path: 'persons',
    component: PersonSearchComponent,
    canActivate: [ AuthGuard ],
    data:{ roles: ['ROLE_VIEW_PERSON'] }},
  {
    path: 'persons/new',
    component: PersonRegisterComponent,
    canActivate: [ AuthGuard ],
    data:{ roles: ['ROLE_REGISTER_PERSON'] }},
  {
    path: 'persons/:id',
    component: PersonRegisterComponent,
    canActivate: [ AuthGuard ],
    data:{ roles: ['ROLE_UPDATE_PERSON'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PersonsRoutingModule { }
