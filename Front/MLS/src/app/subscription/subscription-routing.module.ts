import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPage } from './subscription.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SubscriptionPageRoutingModule {}
