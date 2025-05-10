import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../models/user/user-request.model';
import { UserInterface } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  URL_SERVIDOR = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public newUser(user: UserRequest): Observable<UserInterface>{
    return this.http.post<UserInterface>(`${this.URL_SERVIDOR}/api/v1/users`, user)
  }
}
