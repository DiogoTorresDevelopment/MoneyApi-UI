import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { NotAuthenticatedError } from '../core/error-handler.service';

@Injectable()
export class MoneyHttp extends AuthHttp{

  constructor(
    private auth: AuthService,
    options: AuthConfig,
    http: Http, defOpts?: RequestOptions
  ) {
    super(options, http, defOpts);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.makeRequest(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.makeRequest(() => super.patch(url, body, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.makeRequest(() => super.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response>{
    return this.makeRequest(() => super.options(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.makeRequest(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.makeRequest(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.makeRequest(() => super.put(url, body, options));
  }

  private makeRequest(fn: Function): Observable<Response> {
    if(this.auth.isAccessTokenInvalid()){
      const callNewAccessToken =  this.auth.getNewAccessToken()
        .then(() => {
          if(this.auth.isAccessTokenInvalid()){
            throw new NotAuthenticatedError();
          }
          return fn().toPromise();
        });

      return Observable.fromPromise(callNewAccessToken);
    }else{
      return fn();
    }
  }

}
