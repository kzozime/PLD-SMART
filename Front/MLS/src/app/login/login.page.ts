import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../services/storage-service.service';

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
               private formBuilder : FormBuilder,private storage: StorageService) { 
    this.isAuth = false;
    this.loginCtn = false;
  }

  async ngOnInit() {
    this.initForm();
    console.log('auth refresh :'+ await this.storage.get('isAuth'));
  }
  initForm() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     
    });  
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
    this.authService.login(email, password).subscribe(loginResponse => {

      console.log('response login : '+loginResponse.email);
      this.storage.set('userId',loginResponse['_id']);
      this.storage.set('isAuth', true);
      this.storage.set("loggedUser", loginResponse);

  });
    console.log('utilisateur :'+email+'password'+password);
    this.router.navigateByUrl('/tabnav');

  }

}
