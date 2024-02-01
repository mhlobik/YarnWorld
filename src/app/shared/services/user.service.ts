import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class UserService {
    apiPath = 'http://localhost:4000/users';

    constructor(private http: HttpClient) { }

    getUser(email: string, password: string): Observable<User> {
        return this.http.get(this.apiPath + '?email=' + email + '&&password=' + password).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error);
            })
        );
    }
}