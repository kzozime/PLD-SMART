import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'subscription',
    loadChildren: () => import('../subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'tabnav',
    loadChildren: () => import('../tabnav/tabnav.module').then( m => m.TabnavPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
