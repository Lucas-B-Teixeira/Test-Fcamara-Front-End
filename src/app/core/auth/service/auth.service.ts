import { Injectable } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { UserService } from '../../data-access/user/user.service';
import { UserInterface } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   URL_SERVIDOR = 'http://localhost:8080'

   constructor(
    private userService: UserService
  ) {}

  isAuthenticated() {
    return this.userService.getMe()
      .pipe(
        map((user: UserInterface) => {
          this.userService.setUser(user)
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout() {
     window.sessionStorage.removeItem('access_token');
  }
}
