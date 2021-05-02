import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {
  private myPositionLatitude;
  private myPositionLongitude;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    if(this.isLocated()){
      this.router.navigateByUrl('/center');
    }else{
      this.getLocation();
    }
  }

  async isLocated(): Promise<boolean>{
    let res = await navigator.permissions.query({name:'geolocation'});
    if(res.state == "granted"){
      return true;
    }
    return false;
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.myPositionLongitude = position.coords.longitude;
          this.myPositionLatitude = position.coords.latitude;
        });
    } else {
       console.log("No support for geolocation")
    }
  }

  async onClickTest(){
    let res = await navigator.permissions.query({name:'geolocation'});
    console.log(res);
    if (res.state == "granted"){
      this.router.navigateByUrl('/center');
    }
  }

}
