import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken: string | undefined;
        if (this.authService.currentUser) {
            accessToken = this.authService.currentUser.accessToken;
        }
        if (accessToken) {
            request = request.clone({
                /* TODO check how to allow cors with json-server
                headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
                */
            });
        }
        return next.handle(request);
    }
}