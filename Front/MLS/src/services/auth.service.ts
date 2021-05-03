import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';
import { StorageService } from 'src/app/services/storage-service.service';
@Injectable({
  providedIn: 'root'
})


export class AuthService {


  constructor(private http : HttpClient, private storage: StorageService) { }

  login(email:string,password:string){
    //console.log("isauth authservice:"+this.storage.get('isauth'))
    console.log("service post");
    this.http.post<User>('http://localhost:3000/auth', {emailUser : email, passwordUser : password})
            .subscribe(loginResponse => {

                console.log('response login : '+loginResponse.email);
                this.storage.set('isAuth', true);
                this.storage.set("loggedUser", loginResponse);

            });
  }

 


}
