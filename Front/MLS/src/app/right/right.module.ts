import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RightPageRoutingModule } from './right-routing.module';

import { RightPage } from './right.page';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RightPageRoutingModule
  ],
  declarations: [RightPage, NavbarComponent],
  providers :[DatePipe]
})
export class RightPageModule {}
