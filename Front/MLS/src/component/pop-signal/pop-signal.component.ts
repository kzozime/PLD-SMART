import { Component, OnInit } from '@angular/core';
import { PopSignalService } from 'src/app/services/pop-signal.service';

@Component({
  selector: 'app-pop-signal',
  templateUrl: './pop-signal.component.html',
  styleUrls: ['./pop-signal.component.scss'],
})
export class PopSignalComponent implements OnInit {

  constructor( private popSignal:PopSignalService) {
   
  }

  ngOnInit() {}

  closePopUpSignal(){
    this.popSignal.displayPop = false;
  }
}
