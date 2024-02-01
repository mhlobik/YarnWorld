import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { UNAUTHORIZED } from "../constants";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: any, caught: Observable<any>) => {
                if (error.status === UNAUTHORIZED) {
                    this.authService.logout();
                    location.reload();
                    return of(null);
                } else {
                    return throwError(() => error.error.message || error.statusText);
                }
            })
        );
    }
}