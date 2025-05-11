import { Injectable } from '@angular/core';
import { map, catchError, of, Observable } from 'rxjs';
import { UserService } from '../../../data-access/user/user.service';
import { UserInterface } from '../../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { ResponseToken } from '../../../models/login/response-token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   URL_SERVIDOR = 'http://localhost:8080'

   constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  public login(userLogin: {email: string, password: string}): Observable<ResponseToken>{
    return this.http.post<ResponseToken>(`${this.URL_SERVIDOR}/api/v1/auth/login`, userLogin)
  }

  isAuthenticated() {
    return this.userService.fetchCurrentUser()
      .pipe(
        map(() => {
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout() {
    window.sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
