import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    PatternListComponent,
    PatternCardComponent,
    PatternDetailsComponent,
    PatternCategoryComponent,
    PatternCraftTypeComponent,
    PatternAdministrationComponent,
    PatternAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PatternService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
