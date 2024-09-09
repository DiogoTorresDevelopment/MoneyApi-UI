import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonRegisterComponent } from './person-register/person-register.component';

const routes: Routes = [
  { path: 'persons', component: PersonSearchComponent },
  { path: 'persons/new', component: PersonRegisterComponent },
  { path: 'persons/:id', component: PersonRegisterComponent },
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
