import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopSignalService {
  displayPop !: boolean;
  constructor() { 
    this.displayPop = false;
  }
}
