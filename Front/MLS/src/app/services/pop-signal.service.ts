import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// allow us to display the pop signal
export class PopSignalService {
  displayPop !: boolean;
  constructor() { 
    this.displayPop = false;
  }
}
