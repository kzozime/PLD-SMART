import { Component, OnDestroy, OnInit, ɵgetDebugNode__POST_R3__ } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { MapService } from 'src/services/map.service';
import { Report } from '../models/user/report.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PopSignalService } from '../services/pop-signal.service';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-routing-machine';
import { Point } from '../models/point.model';
import 'geoportal-extensions-leaflet';
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
                private geolocation: Geolocation,
                private popSignal:PopSignalService) { }
  ngOnInit() {
    
  }
  ionViewDidEnter() { this.leafletMap(); }



  leafletMap() {
    this.map = Leaflet.map('mapId').setView([45.771944, 4.8901709], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    //Villeurbanne Marker 
    //Leaflet.marker([45.771944, 4.8901709]).addTo(this.map).bindPopup('Villeurbanne').openPopup();
    //MyPosition
    this.getLocation();
    //Import all reports
    //this.mapService.getAllReports(this.map);
    this.heatMap();
    this.onLocateMe();
    //this.drawPath();

      this.map.on('click', <LeafletMouseEvent>(e) => {
        console.log(e.latlng);
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const idUser = "admin";
        const crimeType = "Vol";
        const description = "populationBD";
        const date = new Date();

        //this.mapService.addReport(lat, lng, idUser, crimeType, description, date);
        //this.mapService.getAllReports(this.map);
        //this.drawPath(lat, lng);
        

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
          //Leaflet.marker([this.myPositionLatitude, this.myPositionLongitude]).addTo(this.map).bindPopup('Me').openPopup();
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
        Leaflet.marker([this.latitude, this.longitude]).addTo(this.map).bindPopup('Me').openPopup();
        this.mapService.getClosestReport(this.latitude,this.longitude,this.map);
        
      }).catch(
      async (error) => {
        
      }
    );
  }
  onReport(){
    this.popSignal.displayPop = true;
  }
  delete(){
    this.map = null;
  }

  drawPath(lat: number, lng: number){
    const p1 = new Point(45.77889767785222, 4.8667287826538095);
    console.log('p1:'+4.8667287826538095+','+45.77889767785222);
    const p2 = new Point(lat, lng);
    console.log('p2:'+lng+','+lat);
    const tab = [];
    tab.push(p1);
    tab.push(p2);
   this.mapService.getPath(tab).subscribe(res =>{
    //console.log("res api : "+ JSON.stringify(res["features"][0]['geometry']['coordinates']));
    //const tabResult = res["features"][0]['geometry']['coordinates'];
    //console.log("coordinate de 0 : "+tabResult);
    
    var layer = L.geoJSON(JSON.parse(JSON.stringify(res))).addTo(this.map);
    //console.log("verif : "+ res["features"][0]['geometry']['coordinates']);

  });
  }

  async heatMap(){

    var reportData = [];
    await this.mapService.getAllReports2().subscribe(res => {
      res.forEach(function(r){
        console.log(r.date);
        var danger: number;
        if(r.crimeType === "Vol"){
          danger = 3;
        }else if(r.crimeType === "Agression"){
          danger = 10;
        }else if(r.crimeType === "Harcèlement"){
          danger = 6;
        }else{
          danger = 1;
        }
        reportData.push([r.latitude, r.longitude, danger]);
      })
      var heat = L.heatLayer(reportData, {radius: 40}).addTo(this.map);
    });

      /*console.log("le tableau :" + reportData[0]);
    var heat = L.heatLayer([
      [45.771944, 4.8901709, 1], // lat, lng, intensity
      [this.myPositionLatitude, this.myPositionLongitude, 0.5]
    ], {radius: 25}).addTo(this.map);*/
  }
}


