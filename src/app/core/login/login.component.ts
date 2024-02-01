import { Component, Injector, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { MessageComponent } from "../message/message.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends MessageComponent implements OnInit {
    email: string | undefined;
    password: string | undefined;
    loading = false;
    returnUrl: string | undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        injector: Injector
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

        let isLoggedIn = this.authService.isLoggedIn();

        if (isLoggedIn) {
            if (this.returnUrl != "/login") this.router.navigate([this.returnUrl]);
            else this.router.navigate(["/"]);
        }
    }



    login() {
        this.loading = true;
        if (this.email && this.password) {
            this.authService.login(this.email, this.password).subscribe({
                next: (user) => {
                    this.loading = false;
                    this.router.navigate(['/patterns']);
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
