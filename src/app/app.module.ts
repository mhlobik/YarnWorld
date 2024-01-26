import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGModule } from './primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { PatternService } from './shared/services/pattern.service';
import { PatternListComponent } from './patterns/pattern-list/pattern-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PatternListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    HttpClientModule
  ],
  providers: [
    PatternService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
