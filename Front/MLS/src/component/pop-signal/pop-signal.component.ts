import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-signal',
  templateUrl: './pop-signal.component.html',
  styleUrls: ['./pop-signal.component.scss'],
})
export class PopSignalComponent implements OnInit {

  popSignal!: boolean;
  constructor() {
    this.popSignal = false;
  }

  ngOnInit() {}

  closePopUpSignal(){
    this.popSignal = false;
  }
}
