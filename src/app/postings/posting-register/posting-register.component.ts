import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Posting } from '../../core/model';
import { PostingService } from '../posting.service';
import { CategoryService } from '../../categories/category.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PersonsService } from '../../persons/persons.service';

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
  // posting = new Posting();
  form: FormGroup;


  constructor(
    private categoryService: CategoryService,
    private personsService: PersonsService,
    private postingService: PostingService,
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurationForm();
    this.title.setTitle("Cadastro de Lançamentos");

    const idPosting = this.route.snapshot.params['id'];

    if (idPosting) {
      this.loadLaunch(idPosting);
    }

    this.findAllCategories();
    this.findAllPersons();
  }

  configurationForm() {
    this.form = this.formBuilder.group({
      id: [],
      postingType: [ 'RECEITA', Validators.required ],
      dueDate: [ null, Validators.required ],
      paymentDate: [],
      postingDescription: [ null, [ this.validateMandatory, this.validateMinLenght(5) ] ],
      postingValue: [ null,  Validators.required ],
      person: this.formBuilder.group({
        id: [ null, Validators.required ],
        personName: [],
      }),
      category: this.formBuilder.group({
        id: [ null, Validators.required ],
        categoryName: [],
      }),
      note: [],
    });
  }

  validateMandatory(input: FormControl) {
   return (input.value ? null : { mandatory: true });
  }

  validateMinLenght(value: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= value) ? null : { minLength: { length: value }};
    }
  }

  getEditing(){
    return Boolean(this.form.get('id').value);
  }

  loadLaunch(id: number){
    this.postingService.findById(id)
      .then(posting => {

        this.form.patchValue(posting);

        this.updateTitleEdition();
      }).catch(error => this.errorHandler.handle(error));
  }

  findAllCategories() {
    return this.categoryService.findAll()
      .then(categories => {
        this.categories = categories.map(category => ({ label: category.categoryName, value: category.id}));
      }).catch(err => this.errorHandler.handle(err));
  }

  findAllPersons() {
    return this.personsService.findAll()
      .then(persons => {
        this.persons = persons.map(person => ({ label: person.personName, value: person.id}));
      }).catch(err => this.errorHandler.handle(err));
  }

  save() {
    if(this.getEditing()){
      this.update();
    }
    else{
      this.create();
    }
  }

  update() {
    this.postingService.update(this.form.value)
      .then(posting => {
        this.form.patchValue(posting);

        this.toastyService.success('Lançamento atualizado com sucesso!');
        this.updateTitleEdition();
      }).catch(err => this.errorHandler.handle(err));
  }

  create(){
    this.postingService.save(this.form.value)
      .then(postingSaved => {
        this.toastyService.success('Lançamento cadastrado com sucesso!');

        this.router.navigate(['/postings', postingSaved.id]);
      })
      .catch(err => this.errorHandler.handle(err));
  }

  new() {
      this.form.reset();

      setTimeout(function() {
        this.posting = new Posting();
      }.bind(this), 1)

      this.router.navigate(['/postings/new']);
  }

  updateTitleEdition(){
    this.title.setTitle(`Edição do Lançamento: ${this.form.get('postingDescription').value}`);
  }

}
