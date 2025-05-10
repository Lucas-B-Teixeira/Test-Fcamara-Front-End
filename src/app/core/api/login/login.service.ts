import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseToken } from '../../models/login/response-token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL_SERVIDOR = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public login(userLogin: {email: string, password: string}): Observable<ResponseToken>{
    return this.http.post<ResponseToken>(`${this.URL_SERVIDOR}/api/v1/auth/login`, userLogin)
  }
}
