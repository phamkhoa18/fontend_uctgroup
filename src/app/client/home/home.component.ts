import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/services_client/data.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLoading : Boolean = true ;
  listoutstanding : any ;
  listimage : any = [] ;
  listslider : any = [] ;
  listsection1 : any = [] ;
  listsection2 : any = [] ;
  listhexagon : any = [] ;
  isshow : Boolean = false  ;


  section1 : any ;
  section2 : any ;
  sectionAll : any ;
  // dòng chảy
 private _listoutstanding : BehaviorSubject<[]> = new BehaviorSubject([]);

  // nhà máy gửi nhận
  listoutstading$ : Observable<[]> = this._listoutstanding.asObservable() ;
  constructor(private dataservice : DataService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData() ;
    this.slider();
    this.content() ;

  }

  setData(data : any) {
    this._listoutstanding.next(data);
  }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      $('.owl-carousel').slick({
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
      $('.responsive').slick({
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    });

    $(document).ready(function() {
      $('.responsive').slick({
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      })

    $(document).ready(function() {
      $('.single-item').slick({
        speed: 500,
      });

    })


  }




  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.dataservice.get('/outstanding')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listoutstanding = v ;
          this.setData(this.listoutstanding);
          this.listoutstading$.subscribe(v => this.listoutstanding = v );
          console.log(this.listoutstanding);
          $('.responsive').slick('reinit'); // khởi tạo lại slick-carousel
          this.isshow = true ;
          $(document).ready(function() {
            $('.responsive').slick({
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ],
              });
            })
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }


  async content() {
    (await this.dataservice.get('/listcontent')).subscribe((v : any) => {
        console.log(v);
        this.sectionAll = v ;

        this.sectionAll.forEach((e : any) => {
            if(e.posision == 'section1') {
                this.section1 = e ;
            }

            if(e.posision == 'section2' ){
                this.section2 = e ;
            }

        });

    })
  }



  async slider() {
    this.isLoading = true ;
    (await this.dataservice.get('/listslider')).subscribe((v : any) => {
        this.listimage = v ;

        // bóc tách ra
        this.listimage.forEach((e : any) => {
              if(e.posision == 'slider') {
                  this.listslider.push(e) ;
              }

              if(e.posision == 'section1') {
                  this.listsection1.push(e) ;
              }

              if(e.posision == 'section2') {
                  this.listsection2.push(e) ;
              }

              if(e.posision == 'hexagon') {
                  this.listhexagon.push(e) ;
              }
        })
        console.log(this.listhexagon);
        this.isLoading = false ;
    })
  }


  button() {
    this._listoutstanding.next([]);
  }
}
