import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, NgForm } from '@angular/forms';


import { Person } from '../../core/model';
import { PersonsService } from '../persons.service';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CategoryService } from '../../categories/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.css']
})
export class PersonRegisterComponent implements OnInit {

  person = new Person();

  constructor(
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private categoryService: CategoryService,
    private personsService: PersonsService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Catastro de Pessoa");

    const idPerson = this.route.snapshot.params['id'];

    if (idPerson) {
      this.loadLaunch(idPerson);
    }

  }

  getEditing(){
    return Boolean(this.person.id);
  }

  loadLaunch(id: number){
    this.personsService.findById(id)
      .then(person => {
        this.person = person;
        this.updateTitleEdition();
      }).catch(error => this.errorHandler.handle(error));
  }

  create(form: FormControl){
    this.personsService.save(this.person)
     .then(() => {
        this.toastyService.success('Pessoa cadastrada com sucesso!');
        form.reset();
        this.person = new Person();
      }).catch(err => this.errorHandler.handle(err));
  }

  save(form: FormControl) {
    if(this.getEditing()){
      this.update(form);
    }
    else{
      this.create(form);
    }
  }

  update(form: FormControl) {
    this.personsService.update(this.person)
      .then(person => {
        this.person = person;

        this.toastyService.success('Pessoa atualizado com sucesso!');
        this.updateTitleEdition();
      }).catch(err => this.errorHandler.handle(err));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.person = new Person();
    }.bind(this), 1)

    this.router.navigate(['/persons/new']);
  }

  updateTitleEdition(){
    this.title.setTitle(`Edição da Pessoa: ${this.person.personName}`);
  }


}
