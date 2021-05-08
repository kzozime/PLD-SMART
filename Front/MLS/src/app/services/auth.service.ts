import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';
import { StorageService } from 'src/app/services/storage-service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class AuthService {


  constructor(private http : HttpClient, private storage: StorageService) { }

  //function which logs you with an email and a password
  login(email:string,password:string): Observable<User>{
    //console.log("isauth authservice:"+this.storage.get('isauth'))
    console.log("service post");
    // this.http.post<User>('http://mon-lyon-sur.herokuapp.com/auth', {emailUser : email, passwordUser : password})
    //         .subscribe(loginResponse => {

    //             console.log('response login : '+loginResponse.email);
    //             this.storage.set('isAuth', true);
    //             this.storage.set("loggedUser", loginResponse);

    // });
    return this.http.post<User>('https://mon-lyon-sur.herokuapp.com/auth', {emailUser : email, passwordUser : password});
            
  }
}
