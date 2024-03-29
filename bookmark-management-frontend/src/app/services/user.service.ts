import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public fullname: WritableSignal<string | undefined> = signal(undefined);
  public email: WritableSignal<string | undefined> = signal(undefined);
  public isLoggedIn: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient) {}

  getMe() {
    return this.http.get(`${environment.baseApiUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
  }

  updateMe({
    fullname,
    email,
    new_password,
    old_password,
  }: {
    fullname?: string;
    email?: string;
    new_password?: string;
    old_password?: string;
  }) {
    return this.http.patch(
      `${environment.baseApiUrl}/user/update/me`,
      {
        old_password,
        new_password,
        email,
        fullname,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      },
    );
  }

  firstName() {
    return computed(() => this.fullname()?.split(' ')[0]);
  }

  /* getFullname() {
    return this.fullname()
  } */
}
