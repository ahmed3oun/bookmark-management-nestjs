import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor(private http: HttpClient) {}

  find({ user_id, title }: { user_id?: number; title?: string }) {
    return this.http.get(
      `${environment.baseApiUrl}/bookmark/find?${
        user_id ? 'user_id=' + user_id : ''
      }${title ? 'title=' + title : ''}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      },
    );
  }

  findOne(id: number) {
    return this.http.get(`${environment.baseApiUrl}/bookmark/find/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
  }

  create({
    title,
    link,
    description,
  }: {
    title: string;
    link: string;
    description?: string;
  }) {
    return this.http.post(
      `${environment.baseApiUrl}/bookmark/create`,
      {
        title,
        link,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      },
    );
  }

  update({
    id,
    title,
    link,
    description,
  }: {
    id: number;
    title?: string;
    link?: string;
    description?: string;
  }) {
    return this.http.patch(
      `${environment.baseApiUrl}/bookmark/update`,
      {
        id,
        title,
        link,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      },
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.baseApiUrl}/bookmark/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
  }
}
