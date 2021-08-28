import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    suite: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id): Observable<User> {
    return this.http.get<any>(`${environment.httpUrl}/users/${id}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }
}
