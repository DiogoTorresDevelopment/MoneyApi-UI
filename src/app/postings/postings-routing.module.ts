import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostingSearchComponent } from './posting-search/posting-search.component';
import { PostingRegisterComponent } from './posting-register/posting-register.component';

const routes: Routes = [
  { path: 'postings', component: PostingSearchComponent },
  { path: 'postings/new', component: PostingRegisterComponent },
  { path: 'postings/:id', component: PostingRegisterComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostingsRoutingModule { }
