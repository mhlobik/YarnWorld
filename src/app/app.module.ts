import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from './primeng.module';
import { FormsModule } from '@angular/forms';

import { PatternService } from './shared/services/pattern.service';
import { PatternListComponent } from './patterns/pattern-list/pattern-list.component';
import { PatternCardComponent } from './patterns/pattern-card/pattern-card.component';
import { PatternAddEditComponent } from './pattern-administration/pattern-add-edit/pattern-add-edit.component';
import { PatternDetailsComponent } from './patterns/pattern-details/pattern-details.component';
import { PatternCategoryComponent } from './patterns/pattern-category/pattern-category.component';
import { PatternCraftTypeComponent } from './patterns/pattern-craft-type/pattern-craft-type.component';
import { PatternAdministrationComponent } from './pattern-administration/pattern-administration.component';

import { ConfirmationService, MessageService } from "primeng/api";
import { LoginComponent } from './core/login/login.component';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { AuthInterceptor } from "./shared/services/auth.interceptor";
import { ErrorInterceptor } from './shared/services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PatternListComponent,
    PatternCardComponent,
    PatternDetailsComponent,
    PatternCategoryComponent,
    PatternCraftTypeComponent,
    PatternAdministrationComponent,
    PatternAddEditComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    PatternService,
    ConfirmationService,
    MessageService,
    UserService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
