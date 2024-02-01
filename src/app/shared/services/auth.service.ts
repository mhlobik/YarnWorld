import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map, switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { CURRENT_USER } from "../constants";
import { Token } from "../models/token";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { HelperService } from "./helper.service";
import sign from "jwt-encode";

@Injectable({ providedIn: "root" })
export class AuthService implements OnDestroy {
    currentUser: User | undefined;
    apiPath = 'http://localhost:4000';
    currentUser$ = new BehaviorSubject<User | undefined>(undefined);

    constructor(private http: HttpClient, private router: Router, private helperService: HelperService) { }

    ngOnDestroy(): void {
        this.currentUser$?.unsubscribe();
    }

    isTokenExpired(rawToken: string): boolean {
        if (rawToken) {
            const decoded = jwtDecode(rawToken);
            const exp = decoded.exp as number;
            return Date.now() >= exp;
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

    /**
     *  For purpose of this app we will have all tokens in database with 1 year of exp date to easier mock them
     *  Call setToken() when user is created for the first time
    **/
    setToken(user: User): Observable<User | undefined> {
        const newToken: Token = {
            id: this.helperService.createId(),
            userId: user.id,
            accessToken: this.encodeJwt(user)
        }
        return this.http.post(this.apiPath + '/tokens', newToken).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error); // probably error Username or password is incorrect
            })
        );
    }

    getToken(user: User): Observable<User | undefined> {
        return this.http.get(this.apiPath + '/tokens?userId=' + user.id).pipe(
            catchError((error: any, caught: Observable<any>) => {
                return throwError(() => error); // probably error Username or password is incorrect
            }),
            map((tokens: Token[]) => {
                const accessToken = tokens[0].accessToken;
                this.currentUser = this.decodeJwt(accessToken);

                if (this.isTokenExpired(accessToken)) {
                    this.currentUser$.next(undefined);
                    return undefined;
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

    encodeJwt(user: User) {
        const now = new Date();
        const exp = new Date('29 January 2025 14:48 UTC');

        const secret = 'secret';
        const data = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            iat: now.toISOString(),
            exp: exp.toISOString() // Jan 29, 2025 because we just want to mock this
        };
        const jwt = sign(data, secret);
        return jwt;
    }

    decodeJwt(jwt: string): User | undefined {
        const decoded: any = jwtDecode(jwt);
        if (decoded) {
            return {
                id: decoded.id,
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                role: decoded.role,
                accessToken: jwt
            };
        } else {
            return undefined;
        }
    }

    isLoggedIn(): boolean {
        if (this.currentUser) {
            if (this.currentUser.accessToken) {
                return !this.isTokenExpired(this.currentUser.accessToken);
            }
        }

        this.logout();
        return false;
    }

    logout(navigate = false) {
        sessionStorage.removeItem(CURRENT_USER);
        this.currentUser$.next(undefined);

        if (navigate) {
            this.router.navigate(['/logout']);
        }
    }
}
