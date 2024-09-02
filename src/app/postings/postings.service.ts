import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export interface PostingFilter {
  postingDescription: string;
  dueDateFrom: Date;
  dueDateTo: Date;
}

@Injectable()
export class PostingsService {

  constructor(private http: Http) { }

  postingsURL = "http://localhost:8080/posting";

  search(filter: PostingFilter): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');

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
      .then(response => response.json().content);
  };

}


