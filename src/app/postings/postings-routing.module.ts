import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostingSearchComponent } from './posting-search/posting-search.component';
import { PostingRegisterComponent } from './posting-register/posting-register.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  {
    path: 'postings',
    component: PostingSearchComponent,
    canActivate: [ AuthGuard ],
    data:{ roles: ['ROLE_VIEW_POSTING'] }
  },
  {
    path: 'postings/new',
    component: PostingRegisterComponent,
    canActivate: [ AuthGuard ],
    data:{ roles: ['ROLE_REGISTER_POSTING'] }
  },
  {
    path: 'postings/:id',
    component: PostingRegisterComponent,
    canActivate: [ AuthGuard ],
    data:{ roles: ['ROLE_UPDATE_POSTING'] }
  }
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
