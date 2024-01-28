import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGModule } from './primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { PatternService } from './shared/services/pattern.service';
import { PatternListComponent } from './patterns/pattern-list/pattern-list.component';
import { PatternCardComponent } from './patterns/pattern-card/pattern-card.component';
import { PatternAddComponent } from './patterns/pattern-add/pattern-add.component';
import { PatternDetailsComponent } from './patterns/pattern-details/pattern-details.component';
import { PatternCategoryComponent } from './patterns/pattern-category/pattern-category.component';
import { PatternCraftTypeComponent } from './patterns/pattern-craft-type/pattern-craft-type.component';

@NgModule({
  declarations: [
    AppComponent,
    PatternListComponent,
    PatternCardComponent,
    PatternAddComponent,
    PatternDetailsComponent,
    PatternCategoryComponent,
    PatternCraftTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    HttpClientModule,
  ],
  providers: [
    PatternService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
