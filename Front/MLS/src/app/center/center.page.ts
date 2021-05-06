import { Component, OnDestroy, OnInit, ɵgetDebugNode__POST_R3__ } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MapService } from 'src/app/services/map.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PopSignalService } from '../services/pop-signal.service';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-routing-machine';
import { Point } from '../models/point.model';
import 'geoportal-extensions-leaflet';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


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
  myPositionMarker: Leaflet.Marker;
  myPath: Leaflet.GeoJSON;

  constructor(private mapService: MapService,
    private geolocation: Geolocation,
    private popSignal: PopSignalService) { 
      this.myPath = null;
    }
    ngOnInit() {
      // Define interval[ms]
          const intervalMs = 100000;
  
      // Create a subscripton to the observable, so the observable is cancelable.
      // The created observable is directly subscribed and the subscription saved.
      console.log("alert");
      let accelerationSensorSubscription = IntervalObservable.create(intervalMs)
          .subscribe(() => {
              this.onLocateMe();
          });
  
    }
  ionViewDidEnter() { this.leafletMap(); }



  leafletMap() {
    this.map = Leaflet.map('mapId').setView([45.771944, 4.8901709], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.markerTab = [];

    //Import all reports
    this.onLocateMe();
    //this.drawPath();


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
        this.map.setView([this.latitude, this.longitude]);
        if (this.myPositionMarker) {
          this.myPositionMarker.remove();
          this.myPositionMarker = null;
        }
        this.myPositionMarker = Leaflet.marker([this.latitude, this.longitude], { icon: blueIcon }).addTo(this.map).bindPopup('Me').openPopup();
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

  async drawPath() {
    var pathState = true;
    if(this.myPath){
      this.myPath.remove();
    }
    
    await this.onLocateMe();
    console.log("Veuillez indiquer votre destination.");
    this.map.on('click', <LeafletMouseEvent>(e) => {
      if (pathState) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const p1 = new Point(this.latitude, this.longitude);
        const p2 = new Point(lat, lng);
        const tab = [];
        tab.push(p1);
        tab.push(p2);
        this.mapService.getPath(tab).subscribe(res => {
          var p = L.geoJSON(JSON.parse(JSON.stringify(res)))
          p.addTo(this.map);
          this.myPath = p;
          pathState = false;

        });
      }
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

  displayReports() {
    var redIcon = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    if (this.markerTab.length > 0) {
      this.markerTab.forEach(e => {
        e.remove();
      });
      this.markerTab = [];
    } else {
      this.mapService.getAllReports2()
        .subscribe(reportResponse => {

          reportResponse.forEach(element => {
            var marker = Leaflet.marker([element.latitude, element.longitude], { icon: redIcon });
            marker
              .bindPopup("type:" + element.crimeType + "\n date:" + element.date)
              .addTo(this.map);
            console.log("test marker : " + element.idUser);
            this.markerTab.push(marker);
          });
        });
    }

  }
}


