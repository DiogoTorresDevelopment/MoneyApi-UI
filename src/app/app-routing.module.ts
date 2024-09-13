import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SecurityRoutingModule } from './security/security-routing.module';
import { PageNoAuthorized } from './core/page-no-authorized.component';
import { PageNotFoundComponent } from './core/page-not-found.component';

const routes: Routes = [
  { path: 'postings', loadChildren: 'app/postings/postings.module#PostingsModule' },
  { path: 'persons', loadChildren: 'app/persons/persons.module#PersonsModule' },
  { path: '', redirectTo: 'postings', pathMatch: 'full' },
  { path: 'page-no-authorized', component: PageNoAuthorized },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SecurityRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
