import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostingsRoutingModule } from './postings/postings-routing.module';
import { PersonsRoutingModule } from './persons/persons-routing.module';
import { SecurityRoutingModule } from './security/security-routing.module';
import { PageNoAuthorized } from './core/page-no-authorized.component';
import { PageNotFoundComponent } from './core/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'postings', pathMatch: 'full' },
  { path: 'page-no-authorized', component: PageNoAuthorized },
  { path: '**', component: PageNotFoundComponent },
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
