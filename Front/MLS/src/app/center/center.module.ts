import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterPageRoutingModule } from './center-routing.module';

import { CenterPage } from './center.page';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AppModule } from '../app.module';

@NgModule({
  imports: [
    AppModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CenterPageRoutingModule
    

    
    
  ],
  declarations: [CenterPage, NavbarComponent],
  exports:[
    
  ]
})
export class CenterPageModule {}
