import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { StorageService } from 'src/app/services/storage-service.service';



@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,private storage: StorageService) {}

  //async function which allows you to use the app only if you're logged
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    console.log(route);
    const isAuth = await this.storage.get('isAuth');

    console.log('auth canA : '+ isAuth);
    

    if (!isAuth) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }
}