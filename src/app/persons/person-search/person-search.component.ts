import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { PersonFilter, PersonsService } from '../persons.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

  persons = [];
  totalElements = 0;
  filter = new PersonFilter();
  @ViewChild('table') table;

  ngOnInit() {

  }

  constructor(
    private personService: PersonsService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,) { }

  search(page = 0): void {
    this.filter.page = page;

    this.personService.search(this.filter).then(response => {
      this.persons = response.content;
      this.totalElements = response.totalElements;
    })
  }

  confirmedDelete(person: any){
    this.confirmationService.confirm({
      message: `Deseja excluir: "${person.personName}"?`,
      accept: () => {
        this.delete(person);
      }
    })
  }

  delete(person: any) {
    this.personService.delete(person.id).then(() => {
      if(this.table.first === 0){
        this.search();
      }else{
        this.table.first = 0;
      }
      this.toastyService.success("Pessoa excluído com sucesso!")
    }).catch(err => this.errorHandler.handle(err));

  }

  whenChangingPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

  changeState(pers: any) {
    this.personService.changeState(pers.id,pers.active).then(() => {
      if(this.table.first === 0){
        this.search();
      }else{
        this.table.first = 0;
      }
      this.toastyService.success("Alterado status com sucesso!")
    }).catch(err => this.errorHandler.handle(err));;
  }
}
