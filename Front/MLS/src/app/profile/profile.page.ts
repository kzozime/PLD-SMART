import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from '../services/storage-service.service';
import { CenterPage } from 'src/app/center/center.page'
import { HttpClient } from '@angular/common/http';
import { Mail } from 'src/app/models/user/mail.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  firstName !: string;
  lastName !: string;
  dateOfBirth !: Date;
  dateBirth !: string;
  nbInvit !: number;
  email !: string;

  constructor(private storage: StorageService,
              private authService: AuthService,
              private route : Router,
              private centerMap: CenterPage,
              private http: HttpClient,
              public datepipe : DatePipe
              ) { }

  async ngOnInit() {
    /*const email = await this.storage.get('loggedEmail');
    const user = await this.authService.getUser(email);*/
    this.email = await this.storage.get('email');
    this.firstName = await this.storage.get('firstName');
    this.lastName = await this.storage.get('lastName');
    this.dateOfBirth = await this.storage.get('dateOfBirth');
    this.dateBirth = this.datepipe.transform(this.dateOfBirth,'dd/MM/yyyy');
    this.nbInvit = await this.storage.get('nbInvit');
  }
  onDisconnect(){
    this.storage.clear();
    this.centerMap.delete();
    this.route.navigateByUrl('/login');
  }
  inviteFriend() {
    const mailInfos = new Mail('Invitation à rejoindre MonLyonSur', 'oussama553@gmail.com', 'urlde telechargment', 'admin');
    return this.http.post('https://mon-lyon-sur.herokuapp.com/mailing', mailInfos).subscribe(reponse => console.log(reponse));

  }
}
