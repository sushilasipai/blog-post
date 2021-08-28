import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { User } from './user.service';

export interface Comment {
  postId: number;
  id: number;
  title: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getAllComments(postId, set): Observable<Comment[]> {
    const numberOfComments = set == 1 ? 3 : set * 10 + 3;
    return this.http
      .get<any>(`${environment.httpUrl}/posts/${postId}/comments`)
      .pipe(
        map((res: any) => {
          return res.slice(0, numberOfComments);
        }),
        catchError((err) => throwError(err))
      );
  }
}
