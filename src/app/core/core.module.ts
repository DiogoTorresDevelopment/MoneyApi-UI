import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PostingService } from '../postings/posting.service';
import { PersonsService } from '../persons/persons.service';
import { CategoryService } from '../categories/category.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNoAuthorized } from './page-no-authorized.component';
import { AuthService } from '../security/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,


    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PageNotFoundComponent, PageNoAuthorized],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    PostingService,
    PersonsService,
    CategoryService,
    AuthService,


    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
