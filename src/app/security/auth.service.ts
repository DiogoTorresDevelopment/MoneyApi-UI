import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.getToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`

  }

  login(user: string, password: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${user}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl,body, {headers, withCredentials:true })
      .toPromise()
      .then(response => {
        console.log(response);

        this.saveToken(response.json().access_token)

      })
      .catch(err => {
        if(err.status === 400) {
          const errorJson = err.json();
          if(errorJson.error === 'invalid_grant') {
            return Promise.reject("Usuário ou senha inválida!");
          }
        }

        return Promise.reject(err);
      })

  }

  private saveToken(token: string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.saveToken(token);
    }
  }

  getNewAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials:true })
      .toPromise()
      .then(reponse => {
        this.saveToken(reponse.json().access_token);

        console.log('Novo access token criado!');
        return Promise.resolve(null);
      }).catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  hasPermission(permission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission)
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  hasRolePermission(roles){
    for(const role of roles){
      if(this.hasPermission(role)){
        return true;
      }
    }

    return false;
  }

  clearAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }


}

