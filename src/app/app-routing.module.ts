import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgAwardedAmountComponent } from './graphs/org-awarded-amount.component';
import { SetAsideByOppsTypeComponent } from './graphs/setaside-opps-type.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
