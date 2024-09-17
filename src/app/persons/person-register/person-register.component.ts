import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



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

  form: FormGroup;



  constructor(
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private categoryService: CategoryService,
    private personsService: PersonsService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurationForm();
    this.title.setTitle("Catastro de Pessoa");

    const idPerson = this.route.snapshot.params['id'];

    if (idPerson) {
      this.loadLaunch(idPerson);
    }

  }

  configurationForm() {
    this.form = this.formBuilder.group({
      id: [],
      personName: [null, [Validators.required, Validators.minLength(5)]],
      address: this.formBuilder.group({
        street: [null, Validators.required],
        addressNumber: [null, Validators.required],
        complement: null,
        district: [null, Validators.required],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        addressState: [null, Validators.required]
      }),
      active: true,
    })
  }

  getEditing(){
    return Boolean(this.form.get('id').value);
  }

  loadLaunch(id: number){
    this.personsService.findById(id)
      .then(person => {
        this.form.patchValue(person);
        this.updateTitleEdition();
      }).catch(error => this.errorHandler.handle(error));
  }

  create(){
    this.personsService.save(this.form.value)
     .then(personSaved => {
        this.toastyService.success('Pessoa cadastrada com sucesso!');

       this.router.navigate(['/persons', personSaved.id]);

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
    this.personsService.update(this.form.value)
      .then(personSaved => {
        this.toastyService.success('Pessoa atualizado com sucesso!');

        this.router.navigate(['/persons', personSaved.id]);

        this.updateTitleEdition();
      }).catch(err => this.errorHandler.handle(err));
  }

  new() {
    this.form.reset();

    setTimeout(function() {
      this.person = new Person();
    }.bind(this), 1)

    this.router.navigate(['/persons/new']);
  }

  updateTitleEdition(){
    this.title.setTitle(`Edição da Pessoa: ${this.form.get('personName').value}`);
  }


}
