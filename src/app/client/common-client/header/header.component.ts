import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services_client/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenu : any  = false ;
  isSearch : any = false ;
  listmenu : any = [] ;
  isLogo : any ;
  timkiem : any ;
  constructor(private dataservice : DataService , private router : Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMenu();
    this.getlogo();
  }

   async getMenu() {
      (await this.dataservice.get('/listmenu')).subscribe((v) => {
          this.listmenu = v ;
          console.log(this.listmenu);
      })
  }

  async getlogo () {
    (await this.dataservice.get('/oneslider/icon')).subscribe((v) => {
        console.log(v);
        this.isLogo = v ;
    })
  }


  openMenu () {
    this.isMenu =! this.isMenu ;
    console.log(this.isMenu);
  }

  search() {
    // xử lý khoảng trắng

    this.router.navigate(['/tim-kiem/' + this.timkiem]);
  }

  openSearch() {
    this.isSearch =!this.isSearch ;
  }
}
