import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'tabnav',
    loadChildren: () => import('./tabnav/tabnav.module').then( m => m.TabnavPageModule)
  },
  {
    path: 'center',
    loadChildren: () => import('./center/center.module').then( m => m.CenterPageModule)
  },
  {
    path: 'left',
    loadChildren: () => import('./left/left.module').then( m => m.LeftPageModule)
  },
  {
    path: 'right',
    loadChildren: () => import('./right/right.module').then( m => m.RightPageModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
