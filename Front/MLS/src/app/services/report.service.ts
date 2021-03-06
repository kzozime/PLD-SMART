import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/user/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  /**
   * Creates a new report
   */
  report(typeSignal:string, 
    descriptionSignal:string,
    longitude:number,
    latitude:number,
    date:Date,
    userId:string
    ):Observable<Report>{
      return this.http.post<Report>('https://mon-lyon-sur.herokuapp.com/map/report', {latitude : latitude, longitude : longitude, idUser : userId, crimeType : typeSignal, description : descriptionSignal, date : date});
  }
}
