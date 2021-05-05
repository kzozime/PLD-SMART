import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';
@Injectable({
  providedIn: 'root'
})


export class AuthService {


  constructor(private http : HttpClient) { }

  login(email: string, password: string){
    console.log("service post");
    // this.http.post<User>('http://localhost:3000/auth', {emailUser : 'test@front.com', passwordUser : 'test'})
    this.http.post<User>('https://mon-lyon-sur.herokuapp.com/auth', {emailUser: email, passwordUser: password})
            .subscribe(loginResponse => {

                console.log(loginResponse.firstName);

            });
  }
}
