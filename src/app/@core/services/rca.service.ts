import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { RcaProject } from "../models/rca";

@Injectable({
  providedIn: "root",
})
export class RcaProjectService {
  private URL = "http://localhost:9090/rca-project";
  private _listeners = new Subject<any>();

  constructor(private http: HttpClient) {}

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  createProject(project: RcaProject): Observable<RcaProject> {
    return this.http.post<RcaProject>(this.URL, project).pipe(
      catchError(this.handleError)
    );
  }

  getAllProjects(): Observable<RcaProject[]> {
    return this.http.get<RcaProject[]>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getProjectById(id: string): Observable<RcaProject> {
    const getUrl = `${this.URL}/${id}`;
    return this.http.get<RcaProject>(getUrl).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(id: string, project: RcaProject): Observable<RcaProject> {
    const updateUrl = `${this.URL}/${id}`;
    return this.http.put<RcaProject>(updateUrl, project).pipe(
      catchError(this.handleError)
    );
  }

  deleteProject(id: string): Observable<any> {
    const deleteUrl = `${this.URL}/${id}`;
    return this.http.delete(deleteUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
