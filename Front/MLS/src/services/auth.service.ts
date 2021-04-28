import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';
@Injectable({
  providedIn: 'root'
})


export class AuthService {


  constructor(private http : HttpClient) { }

  login(){
    console.log("service post");
    this.http.post<User>('http://localhost:3000/auth', {emailUser : 'test@front.com', passwordUser : 'test'})
            .subscribe(loginResponse => {

                console.log(loginResponse.firstName);

            });
  }

}
