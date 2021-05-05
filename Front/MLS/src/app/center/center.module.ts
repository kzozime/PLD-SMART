import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterPageRoutingModule } from './center-routing.module';

import { CenterPage } from './center.page';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PopSignalComponent } from 'src/component/pop-signal/pop-signal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CenterPageRoutingModule,
    
  ],
  declarations: [CenterPage, NavbarComponent, PopSignalComponent],
  exports:[
    
  ]
})
export class CenterPageModule {}
