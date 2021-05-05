import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }
  register(firstName: string, lastName: string, dateOfBirth: Date,
     email: string, password: String, inviteCode: string){
    console.log("register service post");
    this.http.post<User>('https://mon-lyon-sur.herokuapp.com/register', {firstName : firstName, lastName: lastName,
     dateOfBirth: dateOfBirth, email: email, password: password, nbInvitation: 2, inviteCode: inviteCode, verified: false})
            .subscribe(loginResponse => {

                console.log(loginResponse.firstName);

            });
  }

}
