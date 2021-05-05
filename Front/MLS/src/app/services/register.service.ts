import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }
  register(firstName: string, lastName: string, dateOfBirth: Date,
     email: string, password: String, inviteCode: string): Observable<User>{
    console.log("register service post");
    return this.http.post<User>('http://localhost:3000/register', {firstName : firstName, lastName: lastName,
     dateOfBirth: dateOfBirth, email: email, password: password, nbInvitation: 2, inviteCode: inviteCode, verified: false})
            
  }

}
