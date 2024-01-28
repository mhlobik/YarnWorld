import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNGModule } from './primeng.module';
import { PatternListComponent } from './patterns/pattern-list/pattern-list.component';
import { PatternDetailsComponent } from './patterns/pattern-details/pattern-details.component';
import { PatternAdministrationComponent } from './patterns/pattern-administration/pattern-administration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patterns',
    pathMatch: 'full'
  },
  {
    path: 'patterns',
    component: PatternListComponent,
    children: [
      {
        path: ':id',
        component: PatternDetailsComponent
      }
    ]
  },
  {
    path: 'pattern-administration',
    component: PatternAdministrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PrimeNGModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
