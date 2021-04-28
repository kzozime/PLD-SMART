import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-center',
  templateUrl: './center.page.html',
  styleUrls: ['./center.page.scss'],
})
export class CenterPage implements OnInit, AfterViewInit {
  private map;

  private initMap(): void{
    this.map  = L.map('map').setView([39.8282, -98.5795],13);
     /* center: [39.8282, -98.5795],
      zoom: 3*/
    

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
   {
    maxZoom: 18,
    minZoom: 3,
   }
  );
   tiles.addTo(this.map);

  }
  


  constructor( ) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.initMap();
  }
 

}
