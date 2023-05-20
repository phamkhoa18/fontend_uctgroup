import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from 'src/app/services_client/data.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-workdetail',
  templateUrl: './workdetail.component.html',
  styleUrls: ['./workdetail.component.scss']
})
export class WorkdetailComponent {
  isDanhmuc : any  ;
  myId : any ;
  parent : any ;
  listchild : any ;
  item : any ;
  listbaiviet : any ;
  isLoading : Boolean = true ;
  constructor(private route: ActivatedRoute , private dataservice : DataService , private router : Router){

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.myId = params.get('name');
      // Do something with this.id
      console.log(this.myId);
      this.getDetail(this.myId)

    });

  }



   async getDetail(id : any) {
    console.log(id);

      (await this.dataservice.get('/find_category_slug/' + id)).subscribe((v:any) => {
        // Json trả về có 2 loại là parent và child (chú ý)

        // parent
        this.parent = v.parent ;
        // ---- sẽ có 2 trường hợp xảy ra ------
        // 1 mảng dữ liệu của child được trả về
        if(v.child.length > 0) {
            console.log(v);
            this.isDanhmuc = true ;
            this.listchild = v.child ;
            this.isLoading = false ;
        }
        // 2 có child và bắt buộc tìm bài viết
        if(v.child.length == 0) {
          this.isLoading = false ;
          // không còn danh mục con thì tìm bài viết
          this.isDanhmuc = false ;
          this.getBaiviet(this.parent._id) ;

        }

      })
  }

  addMaxWidthToImages(html : any) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const imgs = div.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute('style', 'max-width: 100%');
    }
    return div.outerHTML;
  }

  async getBaiviet(id: any) {
    (await this.dataservice.get('/findnewcategory/' + id)).subscribe((v:any) => {
      this.listbaiviet = v ;
      this.isLoading = false ;
      console.log(this.listbaiviet);

  })
  }
}
