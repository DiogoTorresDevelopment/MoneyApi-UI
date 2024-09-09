import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class CategoryService {

  categoryUrl = 'http://localhost:8080/category';

  constructor(private http: Http) { }


  findAll(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AbW9uZXlhcGkuY29tOmFkbWlu');
    const options = new RequestOptions({ headers });


    return this.http.get(this.categoryUrl, options).toPromise().then(response => response.json());

  }


}
