import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNGModule } from './primeng.module';
import { PatternListComponent } from './patterns/pattern-list/pattern-list.component';
import { PatternDetailsComponent } from './patterns/pattern-details/pattern-details.component';
import { PatternAdministrationComponent } from './pattern-administration/pattern-administration.component';
import { LoginComponent } from './core/login/login.component';
import { LogoutComponent } from './core/logout/logout.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { SignupComponent } from './core/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patterns',
    pathMatch: 'full'
  },
  {
    path: 'patterns',
    component: PatternListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: PatternDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'pattern-administration',
    component: PatternAdministrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PrimeNGModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
