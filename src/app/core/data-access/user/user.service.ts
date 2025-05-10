import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseToken } from '../../models/login/response-token.model';
import { UserInterface } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_SERVIDOR = 'http://localhost:8080'

  user!: UserInterface;

  constructor(private http: HttpClient) { }

  public getMe(): Observable<UserInterface>{
    return this.http.get<UserInterface>(`${this.URL_SERVIDOR}/api/v1/users/me`, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public getUser(): UserInterface{
    return this.user;
  }

  public setUser(user: UserInterface): void{
    this.user = user
  }
}
