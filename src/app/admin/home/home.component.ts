import { Component } from '@angular/core';
import { ApiService } from 'src/app/services_admin/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  slbv : any ;
  slcxl : any;

constructor(private api : ApiService) {
    this.getData();
}

async getData() {
  (await this.api.get('/soluongbaiviet' )).subscribe((v) => {
      console.log(v);
      this.slbv = v ;
  });

  (await this.api.get('/soluongcanxuly')).subscribe((v) => {
      this.slcxl = v ;
  })
}

}
