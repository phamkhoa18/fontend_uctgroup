import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataAdminService } from 'src/app/services_admin/data-admin.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataadminservice : DataAdminService , private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.dataadminservice.isLogin){
        this.router.navigate(['/admin/login']);
        return false ;
      } else {
        this.dataadminservice.isLogin = true ;
        return true ;
      }
  }

}
