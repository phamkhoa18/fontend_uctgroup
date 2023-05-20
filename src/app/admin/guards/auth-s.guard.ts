import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataAdminService } from 'src/app/services_admin/data-admin.service';


@Injectable({
  providedIn: 'root'
})
export class AuthSGuard implements CanActivate {

  constructor(private dataadminservice : DataAdminService , private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('user')){
        this.dataadminservice.isLogin = true ;
        this.router.navigate(['/admin']);
        return false ;
      } else {
        this.dataadminservice.isLogin = false ;
        return true ;
      }
  }

}
