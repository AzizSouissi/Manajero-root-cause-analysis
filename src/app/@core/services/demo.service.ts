import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Demo } from "../models/demo";
@Injectable({
  providedIn: "root",
})
export class DemoService {
  private URL = "http://localhost:9090/demo";
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  constructor(private http: HttpClient) {}

  createDemo(demo: Demo): Observable<Demo> {
    return this.http.post<Demo>(this.URL, demo);
  }

  getDemo(): Observable<Demo> {
    return this.http.get<Demo>(this.URL);
  }

  updateDemo(id: string, demo: Demo): Observable<Demo> {
    const updateUrl = `${this.URL}/${id}`;
    return this.http.put<Demo>(updateUrl, demo);
  }
}
