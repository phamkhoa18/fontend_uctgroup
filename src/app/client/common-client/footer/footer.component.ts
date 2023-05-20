import { Component } from '@angular/core';
import { DataService } from 'src/app/services_client/data.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isLogo : any ;
  isLeft : any ;
  isRight : any ;

  constructor (private dataservice : DataService) {
      this.getFooter() ;
      this.leftcontent() ;
      this.rightcontent() ;
  }

  async getFooter() {
    (await this.dataservice.get('/oneslider/footer')).subscribe((v) => {

        this.isLogo = v ;
    })
  }

  async leftcontent() {
    (await this.dataservice.get('/listcontent/leftfooter')).subscribe((v) => {
      this.isLeft = v ;
  })
  }

  async rightcontent() {
    (await this.dataservice.get('/listcontent/rightfooter')).subscribe((v) => {
      this.isRight = v ;
  })
  }
}
