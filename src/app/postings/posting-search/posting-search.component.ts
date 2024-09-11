import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { PostingFilter, PostingService } from '../posting.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-posting-search',
  templateUrl: './posting-search.component.html',
  styleUrls: ['./posting-search.component.css']
})
export class PostingSearchComponent implements OnInit {

  totalElements = 0;
  postings = [];
  filter = new PostingFilter();
  @ViewChild('table') table;



  constructor(
    private postingService: PostingService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    protected auth: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Pesquisa de Lançamentos");
  }

  search(page = 0): void {

    this.filter.page = page;

    this.postingService.search(this.filter).then(result => {
      this.totalElements = result.totalElements;
      this.postings = result.content;
    })
      .catch(err => this.errorHandler.handle(err));
  }

  confirmedDelete(posting: any){
    this.confirmationService.confirm({
      message: `Deseja excluir o lançamento "${posting.postingDescription}"?`,
      accept: () => {
        this.delete(posting);
      }
    })
  }

  delete(posting: any) {
    this.postingService.delete(posting.id).then(() => {
      if(this.table.first === 0){
        this.search();
      }else{
        this.table.first = 0;
      }
      this.toastyService.success("Lançamento excluído com sucesso!")
    }).catch(err => this.errorHandler.handle(err));;

  }

  whenChangingPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }
}
