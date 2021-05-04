import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { MapService } from 'src/services/map.service';
import { Report } from '../models/user/report.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-center',
  templateUrl: './center.page.html',
  styleUrls: ['./center.page.scss'],
})
export class CenterPage implements OnInit, OnDestroy{
  map: Leaflet.Map;
  private myPositionLatitude;
  private myPositionLongitude;

  latitude: number;
  longitude: number;

  constructor( private mapService : MapService,
                private geolocation: Geolocation) { }
  ngOnInit() {
    
  }
  ionViewDidEnter() { this.leafletMap(); }



  leafletMap() {
    this.map = Leaflet.map('mapId').setView([45.771944, 4.8901709], 12);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    //Villeurbanne Marker 
    Leaflet.marker([45.771944, 4.8901709]).addTo(this.map).bindPopup('Villeurbanne').openPopup();
    //MyPosition
    this.getLocation();
    //Import all reports
    this.mapService.getAllReports(this.map);

    //Pour afficher un chemin
    /*antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);*/

      this.map.on('click', <LeafletMouseEvent>(e) => {
        console.log(e.latlng);
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const idUser = "admin";
        const crimeType = "populationBD";
        const description = "populationBD";
        const date = new Date();

        this.mapService.addReport(lat, lng, idUser, crimeType, description, date);

    });
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
  //A tester avec le tel
  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.myPositionLongitude = position.coords.longitude;
          this.myPositionLatitude = position.coords.latitude;
          Leaflet.marker([this.myPositionLatitude, this.myPositionLongitude]).addTo(this.map).bindPopup('Me').openPopup();

        });
    } else {
       console.log("No support for geolocation")
    }
  }
  async onLocateMe() {
    this.geolocation.getCurrentPosition().then(
      async (resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log("position geolocation : lat= "+this.latitude+" longi= "+this.longitude);
        this.map.setView([this.latitude,this.longitude],20);
      }).catch(
      async (error) => {
        
      }
    );
  }

 
  


  // ngAfterViewInit(){
  //   this.initMap();
  // }
 

}
