import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/user/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  report(typeSignal:string, 
    descriptionSignal:string,
    longitude:number,
    latitude:number,
    date:Date,
    userId:string
    ):Observable<Report>{
      return this.http.post<Report>('http://localhost:3000/report', {latitude : latitude, longitude : longitude, idUser : userId, crimeType : typeSignal, description : descriptionSignal, date : date});
  }
}
