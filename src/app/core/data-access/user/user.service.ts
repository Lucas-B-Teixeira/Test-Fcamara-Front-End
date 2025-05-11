import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from '../../models/user/user.model';
import { UserRequest } from '../../models/user/user-request.model';
import { PageResponse } from '../../models/page/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_SERVIDOR = 'http://localhost:8080'

  private userSubject = new BehaviorSubject<UserInterface | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  public fetchCreateUser(user: UserRequest): Observable<UserInterface>{
    return this.http.post<UserInterface>(`${this.URL_SERVIDOR}/api/v1/users`, user)
  }

  public fetchCurrentUser(): Observable<UserInterface>{
    return this.http.get<UserInterface>(`${this.URL_SERVIDOR}/api/v1/users/me`, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchCountUsers(): Observable<number>{
    return this.http.get<number>(`${this.URL_SERVIDOR}/api/v1/users/count`, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchUsers(page: number, size: number): Observable<PageResponse<UserInterface>> {
    return this.http.get<PageResponse<UserInterface>>(`${this.URL_SERVIDOR}/api/v1/users`, {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

   public fetchEditUser(id: string, user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.URL_SERVIDOR}/api/v1/users/${id}`, user, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchDeleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_SERVIDOR}/api/v1/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  getUser(): UserInterface | null {
    return this.userSubject.value;
  }

  setUser(user: UserInterface): void {
    this.userSubject.next(user);
  }
}
