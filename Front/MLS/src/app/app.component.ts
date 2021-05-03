import { Component, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  constructor(private storage: StorageService){}

   ngOnDestroy(){
   this.storage.clear();
  }
}
