import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Person } from '../core/model';

export class PersonFilter {
  personName: string;
  page = 0;
  size = 5;
}


@Injectable()
export class PersonsService {

  constructor(
    private http: Http,
  ) { }

  personsURL = "http://localhost:8080/person";

  search(filter: PersonFilter): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');

    params.set('page', filter.page.toString());
    params.set('size', filter.size.toString());

    if (filter.personName) {
      params.set('personName', filter.personName);
    }

    const options = new RequestOptions({headers, search: params});

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
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');
    const options = new RequestOptions({headers, search: params});

    return this.http.delete(`${this.personsURL}/${id}`, options)
      .toPromise()
      .then(() => null)
      .catch(error => console.error('Error deleting person', error));
  }

  findAll(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');

    const options = new RequestOptions({ headers });

    return this.http.get(`${this.personsURL}`, options).toPromise()
     .then(response => response.json().content);
  }

  findById(id: number): Promise<Person>{
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');

    return this.http.get(`${this.personsURL}/${id}`, { headers })
     .toPromise()
     .then(response => response.json());
  }

  changeState(id: number, active: boolean): Promise<void> {
    const headers = new Headers({
      'Authorization': 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu',
      'Content-Type': 'application/json'
    });

    const options = new RequestOptions({ headers });

    return this.http.put(`${this.personsURL}/${id}/active`, JSON.stringify(!active), options)
      .toPromise()
      .then(() => null)
      .catch(error => console.error('Error changing state of person', error));

  }

  save(person: Person): Promise<Person> {
    const headers = new Headers({
      'Authorization': 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu',
      'Content-Type': 'application/json'
    });

    return this.http.post(this.personsURL, JSON.stringify(person), { headers })
     .toPromise()
     .then(response => response.json());
  }

  update(person: Person): Promise<Person> {
    const headers = new Headers({
      'Authorization': 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu',
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.personsURL}/${person.id}`, JSON.stringify(person), { headers })
     .toPromise()
     .then(response => response.json());
  }

}
