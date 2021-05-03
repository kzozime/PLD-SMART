import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logForm: FormGroup;
  loginCtn!: boolean;
  isAuth!: boolean;

  constructor(private authService : AuthService, private router : Router,
               private formBuilder : FormBuilder) { 
    this.isAuth = false;
    this.loginCtn = false;
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     
    });  
  }

  onConnect(){
    this.authService.login();
    this.router.navigateByUrl('/tabnav');

  }

  onSubscribe(){
    this.router.navigateByUrl('/subscription');
  }

  onLoginCtn(){
    this.loginCtn = !this.loginCtn;
  }

  onSubmitForm() {
    
    const email = this.logForm.get('email').value;
    const password = this.logForm.get('password').value;
    
    console.log('utilisateur :'+email+'password'+password);
    this.router.navigateByUrl('/tabnav');

  }

}
