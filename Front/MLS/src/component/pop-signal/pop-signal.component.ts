import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopSignalService } from 'src/app/services/pop-signal.service';
import { ReportService } from 'src/app/services/report.service';
import { StorageService } from 'src/app/services/storage-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-pop-signal',
  templateUrl: './pop-signal.component.html',
  styleUrls: ['./pop-signal.component.scss'],
})
export class PopSignalComponent implements OnInit {

  signalForm:FormGroup;

  constructor( 
    private popSignal:PopSignalService,
    private formBuilder : FormBuilder,
    private reportService:ReportService,
    private storage:StorageService,
    private geolocation:Geolocation
    ) {
   
  }

  ngOnInit() {
    this.initForm();
  }
//initialize report dorm
  initForm(){
    this.signalForm = this.formBuilder.group({
      typeSignal:[],
      descriptionSignal:[]
    });
  }

  
  async onSubmitForm(){
    const typeSignal = this.signalForm.get('typeSignal').value;
    const descriptionSignal = this.signalForm.get('descriptionSignal').value;
    const userId = await this.storage.get('userId');
    console.log('id: '+userId);
    let latitude : number;
    let longitude : number;
    this.geolocation.getCurrentPosition().then(
       (resp) => {
        longitude = resp.coords.longitude;
        latitude = resp.coords.latitude;
        const date = new Date();
        this.reportService.report(typeSignal, descriptionSignal, longitude, latitude, date, userId).subscribe(reportResponse => {
          console.log(reportResponse.idUser);
        })
        this.closePopUpSignal();
      }
    )
   

   
  }


//allow us to hide the popSignal component
  closePopUpSignal(){
    this.popSignal.displayPop = false;
  }
}
