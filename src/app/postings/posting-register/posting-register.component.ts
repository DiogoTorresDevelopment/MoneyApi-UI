import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { Posting } from '../../core/model';
import { PostingService } from '../posting.service';
import { CategoryService } from '../../categories/category.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PersonsService } from '../../persons/persons.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posting-register',
  templateUrl: './posting-register.component.html',
  styleUrls: ['./posting-register.component.css']
})
export class PostingRegisterComponent implements OnInit {

  types = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  persons = []
  categories = [];
  posting = new Posting();


  constructor(
    private categoryService: CategoryService,
    private personsService: PersonsService,
    private postingService: PostingService,
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    this.title.setTitle("Cadastro de Lançamentos");

    const idPosting = this.route.snapshot.params['id'];

    if (idPosting) {
      this.loadLaunch(idPosting);
    }

    this.findAllCategories();
    this.findAllPersons();
  }

  getEditing(){
    return Boolean(this.posting.id);
  }

  loadLaunch(id: number){
    this.postingService.findById(id)
      .then(posting => {
        this.posting = posting;
        this.updateTitleEdition();
      }).catch(error => this.errorHandler.handle(error));
  }

  findAllCategories() {
    return this.categoryService.findAll()
      .then(categories => {
        this.categories = categories.map(category => ({ label: category.categoryName, value: category.id}));
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

  findAllPersons() {
    return this.personsService.findAll()
      .then(persons => {
        this.persons = persons.map(person => ({ label: person.personName, value: person.id}));
      }).catch(err => this.errorHandler.handle(err));
  }

  update(form: FormControl) {
    this.postingService.update(this.posting)
      .then(posting => {
        this.posting = posting;

        this.toastyService.success('Lançamento atualizado com sucesso!');
        this.updateTitleEdition();
      }).catch(err => this.errorHandler.handle(err));
  }

  create(form: FormControl){
    this.postingService.save(this.posting)
      .then(postingSaved => {
        this.toastyService.success('Lançamento cadastrado com sucesso!');

        this.router.navigate(['/postings', postingSaved.id]);
      })
      .catch(err => this.errorHandler.handle(err));
  }

  new(form: FormControl) {
      form.reset();

      setTimeout(function() {
        this.posting = new Posting();
      }.bind(this), 1)

      this.router.navigate(['/postings/new']);
  }

  updateTitleEdition(){
    this.title.setTitle(`Edição do Lançamento: ${this.posting.postingDescription}`);
  }

}
