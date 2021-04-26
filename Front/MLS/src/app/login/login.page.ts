import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginCtn!: boolean;
  isAuth!: boolean;

  constructor() { 
    this.isAuth = false;
    this.loginCtn = false;
  }

  ngOnInit() {
  }

  onConnect(){
    this.isAuth = true;
    console.log(this.isAuth);
  }

  onLoginCtn(){
    this.loginCtn = !this.loginCtn;
  }
}
