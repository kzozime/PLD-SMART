import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-center',
  templateUrl: './center.page.html',
  styleUrls: ['./center.page.scss'],
})
export class CenterPage implements OnInit, OnDestroy{
  map: Leaflet.Map;

  constructor() { }
  ngOnInit() {}
  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([45.771944, 4.8901709], 12);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet Feat Aymen ^^',
    }).addTo(this.map);

    /*Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();*/

    //Villeurbanne Marker 
    Leaflet.marker([45.771944, 4.8901709]).addTo(this.map).bindPopup('Villeurbanne').openPopup();
    //Pour afficher un chemin
    /*antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);*/
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  // private initMap(): void{
  //   this.map  = L.map('map').setView([39.8282, -98.5795],13);
  //    /* center: [39.8282, -98.5795],
  //     zoom: 3*/
    

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //  {
  //   maxZoom: 18,
  //   minZoom: 3,
  //  }
  // );
  //  tiles.addTo(this.map);

  // }
  


  // ngAfterViewInit(){
  //   this.initMap();
  // }
 

}
