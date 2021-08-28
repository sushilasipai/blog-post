import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { User } from './user.service';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithUser {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(set): Observable<Post[]> {
    return this.http.get<any>(`${environment.httpUrl}/posts`).pipe(
      map((res: any) => {
        return res.slice(0, 10 * set);
      }),
      catchError((err) => throwError(err))
    );
  }

  getPostById(id): Observable<Post> {
    return this.http.get<any>(`${environment.httpUrl}/posts/${id}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }
}
