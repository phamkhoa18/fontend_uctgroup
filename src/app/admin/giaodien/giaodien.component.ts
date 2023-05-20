import { Component } from '@angular/core';
import { Menus } from '../models/menus.model';
import { Categories } from '../models/categories.model';
import { ApiService } from 'src/app/services_admin/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { Editor , Toolbar } from 'ngx-editor';

export class Images {
  title : String = ''
  url : String = ''
  link : String = ''
  posision : String = ''
}

export class Editors{
  _id : String = '' ;
  title : String = '' ;
  content : String = '' ;
  posision : String = '' ;
}

@Component({
  selector: 'app-giaodien',
  templateUrl: './giaodien.component.html',
  styleUrls: ['./giaodien.component.scss']
})
export class GiaodienComponent {
  isValid: Boolean = false;
  isLoading: Boolean = true;
  isAdd: Boolean = false;
  editor: Editor = new Editor;
  content1: Editors = new Editors() ;

  image : Images = new Images() ;
  item : any = [] ;
  // dòng sông : Subject
  private _listsliderSubject : BehaviorSubject<[]> = new BehaviorSubject([]);
  // nhà máy : Observable
  listslider$ : Observable<[]> = this._listsliderSubject.asObservable() ;

  slider : any = [] ;
  section1 : any = [] ;
  section2 : any = [] ;
  hexagon : any = [] ;
  icon : any = [] ;
  imgfooter : any = [] ;
  constructor( private api : ApiService , private toastr : ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
      this.getData() ;
  }

  setlistslider(array_new : any) {
    this._listsliderSubject.next(array_new);
  }



  // công cụ soạn thảo
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  add_slider () {
    this.image.posision = 'slider' ;
  }

  async add_section1() {
    this.content1 = new Editors() ;
    this.content1.posision = 'section1' ;
    // lấy dữ liệu lên và chỉnh sửa
    (await this.api.get('/listcontent/' + this.content1.posision)).subscribe((v : any) => {
          this.content1._id = v._id ;
          this.content1.title = v.title ;
          this.content1.content = v.content ;
          console.log(v);

    })
  }

  async add_leftfooter() {
    this.content1 = new Editors() ;
    this.content1.posision = 'leftfooter' ;
    // lấy dữ liệu lên và chỉnh sửa
    (await this.api.get('/listcontent/' + this.content1.posision)).subscribe((v : any) => {
          this.content1._id = v._id ;
          this.content1.title = v.title ;
          this.content1.content = v.content ;
  })
  }

  async add_rightfooter() {
    this.content1 = new Editors() ;
    this.content1.posision = 'rightfooter' ;
    // lấy dữ liệu lên và chỉnh sửa
    (await this.api.get('/listcontent/' + this.content1.posision)).subscribe((v : any) => {
          this.content1._id = v._id ;
          this.content1.title = v.title ;
          this.content1.content = v.content ;
    })
  }

  async add_contact() {
    this.content1 = new Editors() ;
    this.content1.posision = 'contact' ;
    // lấy dữ liệu lên và chỉnh sửa
    (await this.api.get('/listcontent/' + this.content1.posision)).subscribe((v : any) => {
          this.content1._id = v._id ;
          this.content1.title = v.title ;
          this.content1.content = v.content ;
    })
  }

  add_section_img1() {
    this.image.posision = 'section1' ;
  }

  add_icon() {
    this.image.posision = 'icon' ;
  }

  add_section_img2() {
    this.image.posision = 'section2' ;
  }

  add_img_hexagon() {
    this.image.posision = 'hexagon' ;
  }

  add_img_footer() {
    this.image.posision = 'footer' ;
  }

  async add_section2() {
    this.content1 = new Editors() ;
    this.content1.posision = 'section2' ;
    // lấy dữ liệu lên và chỉnh sửa
    (await this.api.get('/listcontent/' + this.content1.posision)).subscribe((v : any) => {
          this.content1._id = v._id ;
          this.content1.title = v.title ;
          this.content1.content = v.content ;
  })
  }




  async getData() {
    (await this.api.get('/listslider')).subscribe((v) => {
        this.isLoading = false ;
        this.item = v ;
        this.slider = [] ;
        this.section1 = [] ;
        this.section2 = [] ;
        this.hexagon = [];
        this.icon = [] ;
        this.imgfooter = [] ;
        this.item.forEach((e : any) => {
          if(e.posision == 'slider') {
              this.slider.push(e) ;
          }

          if(e.posision == 'section1') {
              this.section1.push(e) ;
          }

          if(e.posision == 'section2') {
              this.section2.push(e) ;
          }

          if(e.posision == 'hexagon') {
              this.hexagon.push(e) ;
          }

          if(e.posision == 'icon') {
              this.icon.push(e) ;
          }

          if(e.posision == 'footer') {
              this.imgfooter.push(e) ;
          }
        })
        this.setlistslider(this.item);
        this.listslider$.subscribe(v => this.item = v );
    })

  }

  submit(data : NgForm) {
      if(data.valid) {
          console.log(this.image);
          const body = {
            title : this.image.title,
            image : this.image.url ,
            link : this.image.link ,
            posision : this.image.posision
          }

          console.log(body);

          if(body.posision == 'section1') {
              this.addSection1(body) ;
          }

          if(body.posision == 'section2') {
              this.addSection2(body) ;
          }

          if(body.posision == 'slider') {
              this.addSlider(body) ;
          }

          if(body.posision == 'hexagon') {
              this.addHexagon(body) ;
          }

          if(body.posision == 'icon') {
              this.addIcon(body) ;
          }

          if(body.posision == 'footer'){
              this.addFooter(body) ;
          }


      }
  }

  async addIcon (body : any) {
    (await this.api.post('/addslider' , body )).subscribe((v : any) => {
        if(v.status == 200) {
          this.toastr.success(
            'Thêm hình thành công',
            `Đã thêm hình thành công`
          );
        } else {
          this.toastr.error(
            'Thêm hình thất bại',
            `Đã thêm hình thất bại thất bại`
          )
        }
        this.getData() ;
        this.image = new Images();
    });
}

async addFooter (body : any) {
  (await this.api.post('/addslider' , body )).subscribe((v : any) => {
      if(v.status == 200) {
        this.toastr.success(
          'Thêm hình thành công',
          `Đã thêm hình thành công`
        );
      } else {
        this.toastr.error(
          'Thêm hình thất bại',
          `Đã thêm hình thất bại thất bại`
        )
      }
      this.getData() ;
      this.image = new Images();
  });
}



  async addSlider (body : any) {
      (await this.api.post('/addslider' , body )).subscribe((v : any) => {
          if(v.status == 200) {
            this.toastr.success(
              'Thêm hình thành công',
              `Đã thêm hình thành công`
            );
          } else {
            this.toastr.error(
              'Thêm hình thất bại',
              `Đã thêm hình thất bại thất bại`
            )
          }
          this.getData() ;
          this.image = new Images();
      });
  }

  async addHexagon (body : any) {
    (await this.api.post('/addslider' , body )).subscribe((v : any) => {

      if(v.status == 200) {
        this.toastr.success(
          'Thêm hình thành công',
          `Đã thêm hình thành công`
        );
      } else {
        this.toastr.error(
          'Thêm hình thất bại',
          `Đã thêm hình thất bại thất bại`
        )
      }
      this.getData() ;
      this.image = new Images();
  });
  }

  async addSection1(body : any) {
      (await this.api.post('/addslider' , body )).subscribe((v : any) => {
        if(v.status == 200) {
          this.toastr.success(
            'Thêm hình thành công',
            `Đã thêm hình thành công`
          );
        } else {
          this.toastr.error(
            'Thêm hình thất bại',
            `Đã thêm hình thất bại thất bại`
          )
        }
        this.getData() ;
        this.image = new Images();
    });
  }

  async addSection2(body : any) {
    (await this.api.post('/addslider' , body )).subscribe((v : any) => {
      if(v.status == 200) {
        this.toastr.success(
          'Thêm hình thành công',
          `Đã thêm hình thành công`
        );
      } else {
        this.toastr.error(
          'Thêm hình thất bại',
          `Đã thêm hình thất bại thất bại`
        )
      }
      this.getData() ;
      this.image = new Images();
  });
  }

  del(item :any) {
    console.log(item);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'

    }).then(async (result) => {
      if (result.isConfirmed) {
        // api xóa
     (await this.api.get('/delslider/' + item._id)).subscribe((v : any) => {
          console.log(v);
          if(v.status = 200) {
            this.getData();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Xóa không thành công',
              text: 'Something went wrong!',
            })
          }
      })
      }
    })
  }






  async savecontent() {
    const body = {
          _id : this.content1._id ,
          title : this.content1.title ,
          content : this.content1.content ,
          posision : this.content1.posision
    } ;
     (await this.api.post("/editcontent" , body )).subscribe((v : any) => {
            if(v.status == 200) {
              this.toastr.success(
                'Sửa bài viết thành công',
                `Đã sửa bài viết thành công`
              );
            } else {
              this.toastr.error(
                'Sửa bài viết thất bại',
                `Đã sửa bài viết thất bại`
              )
            }
     })
  }

}
