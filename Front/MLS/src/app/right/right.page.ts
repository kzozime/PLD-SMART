import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Report } from '../models/user/report.model';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.page.html',
  styleUrls: ['./right.page.scss'],
})
export class RightPage implements OnInit {

  arrayReport = [];

  constructor(private mapService : MapService, public datepipe : DatePipe) { }

  /**
   * async function which displays a list of all the reports 
   */
  async ngOnInit() {
    this.mapService.getAllReports2().subscribe(reportResponse => {
      reportResponse.forEach(element => {
        var pushReport = {created_at: this.datepipe.transform(element.date,'dd/MM/yyyy'), longitude: element.longitude, latitude: element.latitude, crimeType: element.crimeType, description: element.description};
        this.arrayReport.push(pushReport);
      })
    });
  }

}
