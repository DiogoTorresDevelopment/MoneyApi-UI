import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Posting } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class PostingFilter {
  postingDescription: string;
  dueDateFrom: Date;
  dueDateTo: Date;
  page = 0;
  size = 5;
}

@Injectable()
export class PostingService {
  postingsURL:string;

  constructor(private http: AuthHttp) {
    this.postingsURL = `${environment.apiUrl}/posting`
  }

  search(filter: PostingFilter): Promise<any> {
    const params = new URLSearchParams();

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

    const options = new RequestOptions({ search: params});

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

    return this.http.delete(`${this.postingsURL}/${id}`)
      .toPromise()
      .then(() => null);
  }

  save(posting: Posting): Promise<Posting> {

    return this.http.post(`${this.postingsURL}`, JSON.stringify(posting))
      .toPromise()
      .then(response => response.json());
  }

  update(posting: Posting): Promise<Posting>{

    return this.http.put(`${this.postingsURL}/${posting.id}`, JSON.stringify(posting))
     .toPromise()
      .then(response => {
        const postingEditing = response.json() as Posting;

        this.convertStringToDate([postingEditing]);

        return postingEditing;
      });
  }



  findById(id: number): Promise<Posting> {

    return this.http.get(`${this.postingsURL}/${id}`)
      .toPromise()
      .then(response => {
        const posting = response.json() as Posting;

        this.convertStringToDate([posting]);

        return posting;
      });
  }


  private convertStringToDate(postings: Posting[]) {
    for (const posting of postings) {
      posting.dueDate = moment(posting.dueDate,
        'YYYY-MM-DD').toDate();

      if (posting.paymentDate) {
        posting.paymentDate = moment(posting.paymentDate,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}


