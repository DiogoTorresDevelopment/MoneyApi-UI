import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PersonSearchComponent } from './persons/person-search/person-search.component';
import { PostingsRoutingModule } from './postings/postings-routing.module';
import { PersonsRoutingModule } from './persons/persons-routing.module';
import { SecurityRoutingModule } from './security/security-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'postings', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PostingsRoutingModule,
    PersonsRoutingModule,
    SecurityRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
