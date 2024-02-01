import { EventEmitter, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map, switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CURRENT_USER } from "../constants";
import { Token } from "../models/token";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService implements OnDestroy {
    currentUser: User | undefined;
    apiPath = 'http://localhost:4000';
    currentUser$ = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient, private router: Router) { }

    ngOnDestroy(): void {
        this.currentUser$?.unsubscribe();
    }

    isTokenExpired(rawToken: string): boolean {
        if (rawToken) {
            const helper = new JwtHelperService();
            const isTokenExpired = helper.isTokenExpired(rawToken);
            if (isTokenExpired) return true;
        }
        return false;
    }

    login(email: string, password: string) {
        return this.http.get(this.apiPath + '/users?email=' + email + '&&password=' + password)
            .pipe(
                catchError((error: any, caught: Observable<any>) => {
                    return throwError(() => error);
                }),
                switchMap((users: User[]) => {
                    if (users && users.length > 0) {
                        return this.getToken(users[0]);
                    } else {
                        return throwError(() => 'Username or password is incorrect');
                    }
                })
            );
    }

    getToken(user: User): Observable<User | null> {
        return this.http.get(this.apiPath + '/tokens?userId=' + user.id).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error); // probably error Username or password is incorrect
            }),
            map((tokens: Token[]) => {
                const accessToken = tokens[0].accessToken;
                this.currentUser = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    accessToken
                };

                if (this.isTokenExpired(accessToken)) {
                    this.currentUser$.next(null);
                    return null;
                } else {
                    sessionStorage.setItem(
                        CURRENT_USER,
                        JSON.stringify(this.currentUser)
                    );
                    this.currentUser$.next(this.currentUser);
                    return this.currentUser;
                }
            })
        );
    }

    isLoggedIn(): boolean {
        if (this.currentUser) {
            const helper = new JwtHelperService();
            const rawToken = this.currentUser.accessToken;
            if (rawToken) {
                const isTokenExpired = helper.isTokenExpired(rawToken);
                return !isTokenExpired;
            }

        }

        this.logout();
        return false;
    }

    logout(navigate = false) {
        sessionStorage.removeItem(CURRENT_USER);
        this.currentUser$.next(null);

        if (navigate) {
            this.router.navigate(['/logout']);
        }
    }
}
