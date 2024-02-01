import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../../app.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                AppModule
            ],
            declarations: [
                LoginComponent
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have email and password inputs', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
        const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');

        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    });

    it('should have Login button', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('button')?.textContent).toContain('Login');
    });
});
