import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  redirectMap(){
    this.router.navigate(['/center']);
  }

  redirectUser(){
    this.router.navigate(['/profile']);
  }

  isActive(num:number):string{
    if(this.router.url === '/profile' && num === 1){
      return 'active';
    }
    else if(this.router.url == '/center' && num === 2){
      return 'active';
    }
    else if(this.router.url == '/' && num === 3){
      return 'active';
    }
  }
}
