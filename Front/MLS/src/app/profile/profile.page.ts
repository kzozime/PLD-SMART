import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from '../services/storage-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private storage: StorageService,
              private authService: AuthService,
              private route : Router) { }

  async ngOnInit() {
    /*const email = await this.storage.get('loggedEmail');
    const user = await this.authService.getUser(email);*/
  }
  onDisconnect(){
    this.storage.clear();
    this.route.navigateByUrl('/login');
  }
}
