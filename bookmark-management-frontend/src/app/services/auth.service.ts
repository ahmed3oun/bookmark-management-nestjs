import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<Record<string, any>> {
    return this.http.post(`${environment.baseApiUrl}/auth/signin`, {
      email,
      password,
    });
  }

  signup({
    email,
    password,
    fullname,
  }: {
    email: string;
    password: string;
    fullname: string;
  }): Observable<Record<string, any>> {
    return this.http.post(`${environment.baseApiUrl}/auth/signup`, {
      email,
      password,
      fullname,
    });
  }

  logout(): void {
    window.localStorage.clear();
    window.location.reload();
  }
}
