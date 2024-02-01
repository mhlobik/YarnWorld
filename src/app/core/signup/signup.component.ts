import { Component, Injector } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { MessageComponent } from "../message/message.component";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, switchMap, tap, throwError } from "rxjs";
import { User } from "../../shared/models/user";
import { HelperService } from "../../shared/services/helper.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent extends MessageComponent {
    email: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    loading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private helperService: HelperService,
        private authService: AuthService,
        injector: Injector
    ) {
        super(injector);
    }

    signUp() {
        this.loading = true;
        if (this.email && this.password && this.firstName && this.lastName) {
            const newUser: User = {
                id: this.helperService.createId(),
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                role: 'admin'
            };

            // First check if user with this email exists, if not create user
            this.userService.getUserByEmail(this.email).pipe(
                catchError(error => {
                    return throwError(() => error);
                }),
                tap(users => {
                    if (users && users.length > 0) {
                        throwError(() => 'User with this email already exists!')
                    }
                }),
                switchMap(users => {
                    // create user
                    return this.userService.createUser(newUser).pipe(
                        catchError(error => {
                            return throwError(() => error);
                        }),
                        switchMap(res => {
                            //  Call setToken() when user is created for the first time to easier mock jwt token
                            return this.authService.setToken(newUser)
                        })
                    );
                })
            ).subscribe({
                next: (user) => {
                    this.loading = false;
                    this.addMessageSuccess('Successfully signed up! Please login');
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    this.addMessageError(err);
                    this.loading = false;
                }
            });
        } else {
            this.loading = false;
        }
    }
}
