import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavPage,
    children: [
      {
        path: 'center',
        children : [
          {
            path: '',
            loadChildren: () => import('../center/center.module').then( m => m.CenterPageModule)
          }
        ]
      },
      {
        path: 'left',
        children : [
          {
            path: '',
             loadChildren: () => import('../left/left.module').then( m => m.LeftPageModule)
          }   
        ]  
      },
      {
        path: 'right',
        children : [
          {
            path: '',
          loadChildren: () => import('../right/right.module').then( m => m.RightPageModule)
          }
        ]  
      }

    ]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
