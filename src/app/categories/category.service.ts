import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoryService {

  categoryUrl = 'http://localhost:8080/category';

  constructor(private http: AuthHttp) { }

  findAll(): Promise<any> {
    return this.http.get(this.categoryUrl).toPromise().then(response => response.json());
  }
}
