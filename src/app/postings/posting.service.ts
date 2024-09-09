import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Posting } from '../core/model';

export class PostingFilter {
  postingDescription: string;
  dueDateFrom: Date;
  dueDateTo: Date;
  page = 0;
  size = 5;
}

@Injectable()
export class PostingService {

  constructor(private http: Http) { }

  postingsURL = "http://localhost:8080/posting";

  search(filter: PostingFilter): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');

    params.set('page', filter.page.toString());
    params.set('size', filter.size.toString());

    if (filter.postingDescription) {
      params.set('postingDescription', filter.postingDescription);
    }
    if (filter.dueDateFrom) {
      params.set('dueDateFrom',
        moment(filter.dueDateFrom).format('YYYY-MM-DD')
      );
    }
    if (filter.dueDateTo) {
      params.set('dueDateTo',
        moment(filter.dueDateTo).format('YYYY-MM-DD')
      );
    }

    const options = new RequestOptions({headers, search: params});

    return this.http.get(`${this.postingsURL}?projection`, options).toPromise()
      .then(response => {
        const respondeJson = response.json();
        const postings = respondeJson.content;

        const result = {
          totalElements: respondeJson.totalElements,
          totalPages: respondeJson.totalPages,
          content: postings
        }

        return result;
      });
  };

  delete(id: number): Promise<void> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');
    const options = new RequestOptions({headers, search: params});

    return this.http.delete(`${this.postingsURL}/${id}`, options)
      .toPromise()
      .then(() => null);
  }

  save(posting: Posting): Promise<Posting> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.postingsURL}`, JSON.stringify(posting), {headers})
      .toPromise()
      .then(response => response.json());
  }

  update(posting: Posting): Promise<Posting>{
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.postingsURL}/${posting.id}`, JSON.stringify(posting), {headers})
     .toPromise()
     .then(response => response.json());
  }

  findById(id: number): Promise<Posting> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');

    return this.http.get(`${this.postingsURL}/${id}`, { headers })
      .toPromise()
      .then(response => this.convertStringToDate(response.json()));
  }

  private convertStringToDate(posting: Posting): Posting {
    if (posting.dueDate) {
      posting.dueDate = moment(posting.dueDate, 'YYYY/MM/DD').toDate();
    }

    if (posting.paymentDate) {
      posting.paymentDate = moment(posting.paymentDate, 'YYYY/MM/DD').toDate();
    }

    return posting;
  }

}


