import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Report } from 'src/app/models/user/report.model';
import * as Leaflet from 'leaflet';
@Injectable({
  providedIn: 'root'
})


export class MapService {
  constructor(private http : HttpClient) { }

  addReport(
    lat: number,
    lng: number,
    idUser: string, 
    crimeType: string, 
    description: string,
    date: Date ){
    console.log("service post Report");

    const report = new Report(lat, lng, idUser, crimeType, description,date);

    this.http.post<Report>('http://localhost:3000/map/report', report)
            .subscribe(reportResponse => {
                console.log(reportResponse);
            });
  }

    async getAllReports(map: Leaflet.Map): Promise<void> {
        var redIcon = new Leaflet.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          

    this.http.get<Report[]>('http://localhost:3000/map/report')
    .subscribe(reportResponse => {
        //console.log(reportResponse);
        reportResponse.forEach(element => {
            Leaflet.marker([element.latitude, element.longitude],{icon: redIcon}).addTo(map);
            console.log(element.idUser);
        });
    });
    
  }

}