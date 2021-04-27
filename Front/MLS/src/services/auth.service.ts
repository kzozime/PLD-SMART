import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(){
    console.log("service post")
    this.http.post('localhost:3000/auth',{});
  }

}
