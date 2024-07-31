import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private API_URL = 'http://localhost:9092/api/';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(this.API_URL + 'user/retrieve', {
      params: { username: username }
    });
  }
}
