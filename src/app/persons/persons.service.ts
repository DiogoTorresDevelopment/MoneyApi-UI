import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Person } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class PersonFilter {
  personName: string;
  page = 0;
  size = 5;
}


@Injectable()
export class PersonsService {

  personsURL:string;


  constructor(
    private http: AuthHttp,
  ) {
    this.personsURL = `${environment.apiUrl}/person`
  }


  search(filter: PersonFilter): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filter.page.toString());
    params.set('size', filter.size.toString());

    if (filter.personName) {
      params.set('personName', filter.personName);
    }
    const options = new RequestOptions({ search: params});

    return this.http.get(`${this.personsURL}?`, options).toPromise()
     .then(response => {
        const respondeJson = response.json();
        const persons = respondeJson.content;

        const result = {
          totalElements: respondeJson.totalElements,
          totalPages: respondeJson.totalPages,
          content: persons
        }

        return result;
      })
      .catch(error => console.error('Error searching persons', error));
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.personsURL}/${id}`)
      .toPromise()
      .then(() => null)
      .catch(error => console.error('Error deleting person', error));
  }

  findAll(): Promise<any> {

    return this.http.get(`${this.personsURL}`).toPromise()
     .then(response => response.json().content);
  }

  findById(id: number): Promise<Person>{

    return this.http.get(`${this.personsURL}/${id}`)
     .toPromise()
     .then(response => response.json());
  }

  changeState(id: number, active: boolean): Promise<void> {

    return this.http.put(`${this.personsURL}/${id}/active`, JSON.stringify(!active))
      .toPromise()
      .then(() => null)
      .catch(error => console.error('Error changing state of person', error));

  }

  save(person: Person): Promise<Person> {

    return this.http.post(this.personsURL, JSON.stringify(person))
     .toPromise()
     .then(response => response.json());
  }

  update(person: Person): Promise<Person> {
    return this.http.put(`${this.personsURL}/${person.id}`, JSON.stringify(person))
     .toPromise()
     .then(response => response.json());
  }

}
