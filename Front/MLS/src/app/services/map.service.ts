import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from 'src/app/models/user/report.model';
import * as Leaflet from 'leaflet';
import { Observable } from 'rxjs';
import { Point } from 'src/app/models/point.model';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Injectable({
  providedIn: 'root'
})


export class MapService {
  constructor(private http: HttpClient,
              private localNotifications : LocalNotifications) { }

  // function which permittes you to add an report on the map
  addReport(
    lat: number,
    lng: number,
    idUser: string,
    crimeType: string,
    description: string,
    date: Date) {
    console.log("service post Report");

    const report = new Report(lat, lng, idUser, crimeType, description, date);

    this.http.post<Report>('https://mon-lyon-sur.herokuapp.com/map/report', report)
      .subscribe(reportResponse => {
        //console.log(reportResponse);
      });
  }

  //function which gets all the reports from the server and display them on the map
  async getAllReports(map: Leaflet.Map): Promise<void> {
    var redIcon = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    this.http.get<Report[]>('https://mon-lyon-sur.herokuapp.com/map/report')
      .subscribe(reportResponse => {
        //console.log(reportResponse);
        reportResponse.forEach(element => {
          Leaflet.marker([element.latitude, element.longitude], { icon: redIcon })
            .bindPopup("type: " + element.crimeType + "| description: "+element.description)
            .addTo(map);
        });
      });

  }

  //function which gets all the reports from the server
  getAllReports2(): Observable<Report[]> {


    return this.http.get<Report[]>('https://mon-lyon-sur.herokuapp.com/map/report');

  }

  //function wich returns a path between 2 points
  getPath(pointTab: Point[]) {

    const url = 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248705a95d4af6f413eb6e123dcf8c607b7&start=' +
      pointTab[0].lng + ',' + pointTab[0].lat + '&end=' + pointTab[1].lng + ',' + pointTab[1].lat;
    console.log(url);
    return this.http.get(url);

  }

  /**
   * function which returns the closest reports from a location
   * */
  getClosestReport(lat: number, lng: number, map: Leaflet.Map){
    var now = Date.now().valueOf();
    //console.log('now :'+now);
    const reports = this.getAllReports2();
    var myPositiosMarker = Leaflet.circleMarker([lat, lng]);
    var from = myPositiosMarker.getLatLng();
    var i = 0;
    reports.subscribe(res => {
      res.forEach(element => {
        var to = Leaflet.circleMarker([element.latitude,element.longitude]).getLatLng();
        var d = from.distanceTo(to); 
        var reportTime = new Date(element.date).valueOf();
        //console.log("distance : " + d +" m avec i = "+i++);
        var t = now-reportTime;
        //console.log(" time diff : " + reportTime);
        if(d <= 100 && now-reportTime < 3600000){
          /*Leaflet.marker([element.latitude, element.longitude])
          .bindPopup("type:" + element.crimeType + "\n date:" + element.date + "ATTENTION !!!")
          .openPopup()
          .addTo(map);*/
          //notification push
          this.localNotifications.schedule({
            text: 'Attention des incidents ont été signalé près de votre position !',
            trigger: {at: new Date(new Date().getTime()+1000)},
            led: { color: '#FF00FF', on: 500, off: 500 },
            vibrate: true,
            foreground: true,
            sound: null
          });
        }
        /*Leaflet.circleMarker([element.latitude, element.longitude])
          .bindPopup("type:" + element.crimeType + "\n date:" + element.date)
          .addTo(map);*/
      });
    })
    
  }

}
