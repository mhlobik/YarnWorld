import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Pattern } from "../models/pattern";

@Injectable()
export class PatternService {
    apiPath = 'http://localhost:4000/patterns';

    constructor(private http: HttpClient) { }

    getPatterns(): Observable<Pattern[]> {
        return this.http.get(this.apiPath).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error);
            })
        );
    }

    getPattern(id: number): Observable<Pattern> {
        return this.http.get(this.apiPath + '/' + id).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error);
            })
        );
    }

    updatePattern(model: Pattern) {
        return this.http.put(this.apiPath + '/' + model.id, model).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error);
            })
        );
    }

    deletePattern(id: number) {
        return this.http.delete(this.apiPath + '/' + id).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error);
            })
        );
    }
}