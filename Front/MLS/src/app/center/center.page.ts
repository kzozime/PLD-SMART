import { Component, OnDestroy, OnInit, ɵgetDebugNode__POST_R3__ } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { MapService } from 'src/app/services/map.service';
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
export class CenterPage implements OnInit, OnDestroy {
  map: Leaflet.Map;
  latitude: number;
  longitude: number;
  heatM: Leaflet.HeatLayer;
  markerTab: Leaflet.Marker[];

  constructor(private mapService: MapService,
    private geolocation: Geolocation,
    private popSignal: PopSignalService) { }
  ngOnInit() {

  }
  ionViewDidEnter() { this.leafletMap(); }



  leafletMap() {
    this.map = Leaflet.map('mapId').setView([45.771944, 4.8901709], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.markerTab = [];

    //Import all reports
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

  async onLocateMe() {
    var blueIcon = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.geolocation.getCurrentPosition().then(
      async (resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log("position geolocation : lat= " + this.latitude + " longi= " + this.longitude);
        this.map.setView([this.latitude, this.longitude], 20);
        Leaflet.marker([this.latitude, this.longitude],{ icon: blueIcon }).addTo(this.map).bindPopup('Me').openPopup();
        this.mapService.getClosestReport(this.latitude, this.longitude, this.map);

      }).catch(
        async (error) => {

        }
      );
  }
  onReport() {
    this.popSignal.displayPop = true;
  }
  delete() {
    this.map = null;
  }

  drawPath(lat: number, lng: number) {
    const p1 = new Point(45.77889767785222, 4.8667287826538095);
    console.log('p1:' + 4.8667287826538095 + ',' + 45.77889767785222);
    const p2 = new Point(lat, lng);
    console.log('p2:' + lng + ',' + lat);
    const tab = [];
    tab.push(p1);
    tab.push(p2);
    this.mapService.getPath(tab).subscribe(res => {
      var layer = L.geoJSON(JSON.parse(JSON.stringify(res))).addTo(this.map);

    });
  }

  async heatMap() {

    if (this.heatM) {
      this.heatM.remove();
      this.heatM = null;
    } else {
      var reportData = [];
      this.mapService.getAllReports2().subscribe(res => {
        res.forEach(function (r) {
          console.log(r.date);
          var danger: number;
          if (r.crimeType === "Vol") {
            danger = 3;
          } else if (r.crimeType === "Agression") {
            danger = 10;
          } else if (r.crimeType === "Harcèlement") {
            danger = 6;
          } else {
            danger = 1;
          }
          reportData.push([r.latitude, r.longitude, danger]);
        })
        this.heatM = L.heatLayer(reportData, { radius: 40 }).addTo(this.map);
      });
    }


  }

  displayReports(){
    var redIcon = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    if(this.markerTab.length > 0){
      this.markerTab.forEach(e => {
        e.remove();
      });
      this.markerTab=[];
    }else{
      this.mapService.getAllReports2()
    .subscribe(reportResponse => {

      reportResponse.forEach(element => {
        var marker = Leaflet.marker([element.latitude, element.longitude], { icon: redIcon });
        marker
          .bindPopup("type:" + element.crimeType + "\n date:" + element.date)
          .addTo(this.map);
          console.log("test marker : "+element.idUser);
          this.markerTab.push(marker);
      });
    });
    }
    
  }
}


