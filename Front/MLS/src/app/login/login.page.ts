import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginCtn!: boolean;
  isAuth!: boolean;

  constructor(private authService : AuthService, private router : Router) { 
    this.isAuth = false;
    this.loginCtn = false;
  }

  ngOnInit() {
  }

  onConnect(){
    this.authService.login();
  }

  onSubscribe(){
    this.router.navigateByUrl('/subscription');
  }

  onLoginCtn(){
    this.loginCtn = !this.loginCtn;
  }
}
