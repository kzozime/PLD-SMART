import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from '../services/storage-service.service';
import { CenterPage } from 'src/app/center/center.page'
import { HttpClient } from '@angular/common/http';
import { Mail } from 'src/app/models/user/mail.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  constructor(private storage: StorageService,
              private authService: AuthService,
              private route : Router,
              private centerMap: CenterPage,
              private http: HttpClient) { }

  async ngOnInit() {
    /*const email = await this.storage.get('loggedEmail');
    const user = await this.authService.getUser(email);*/
  }
  onDisconnect(){
    this.storage.clear();
    this.centerMap.delete();
    this.route.navigateByUrl('/login');
  }
  inviteFriend() {
    const mailInfos = new Mail('IInvitation à rejoindre MonLyonSur', 'oussama553@gmail.com', 'urlde telechargment', 'admin');
    return this.http.post('http://localhost:3000/mailing', mailInfos).subscribe(reponse => console.log(reponse));

  }
}
