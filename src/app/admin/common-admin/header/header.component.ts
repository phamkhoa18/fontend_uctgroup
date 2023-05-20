import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataAdminService } from 'src/app/services_admin/data-admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isShow = false;
  subscription: Subscription;
  user : any ;

  constructor(private dataadminservice: DataAdminService) {
    this.subscription = this.dataadminservice.isLoginChanged.subscribe((value: boolean) => {
      this.isShow = value;
      if (sessionStorage.getItem('user')) {
        this.user = JSON.parse(sessionStorage.getItem('user') ?? '');
      }
    });



  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
      sessionStorage.removeItem('user') ;
      window.location.reload();
  }
}
