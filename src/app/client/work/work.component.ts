import { Component, Input } from '@angular/core';
import { DataService } from '../../services_client/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  @Input() listwork: Array<any> = [];
  isDanhmuc : any ;
  isLoading : any = true;
  myId : any ;
  listdanhmucchild : any = [] ;
  listbaivietchild : any = [] ;
  parent : any ;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.myId = params.get('name');
      // Do something with this.id
      this.isLoading = true ;
      this.isDanhmuc = false ;
      console.log(this.myId);
      this.getWork(this.myId)
    });
  }

  constructor(private dataservice : DataService , private route: ActivatedRoute) {

  }

  async getWork(params : any ) {
      (await this.dataservice.get('/findmenu/' + params)).subscribe((v) => {
        // trả về 1danh mục hoặc là 1 object rỗng

        // rỗng
          if(Object.values(v).length == 0) {
              this.isDanhmuc = false ;
              this.isLoading = false ;
          }

          // có danh mục
          if(Object.values(v).length > 0) {
              this.parent = v ;
              this.isDanhmuc = true;
              // gọi tiếp api lấy danhmuc về
                // có 2 trường hợp xảy ra
                  // 1. danh mục đó có chứa danh mục con
                  this.getDanhmucChild(this.parent.category_id._id);
                  // 2. danh mục đó chứa bài viết

          }

      })
  }

  async getDanhmucChild(id_parent: any) {
    try {
      let danhmucChild : any = []
      danhmucChild = await (await this.dataservice.get('/find_category_id/' + id_parent)).toPromise();

      console.log(danhmucChild);
      this.listdanhmucchild = danhmucChild;
      if (this.listdanhmucchild.length == 0) {
        await this.getBaivietChild(this.parent.category_id._id);
      } else {
        this.isDanhmuc = true ;
        this.isLoading = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getBaivietChild(_id_category: any) {
    try {
      const datePipe = new DatePipe('en-US');
      const baivietChild = await (await this.dataservice.get('/findnewcategory/' + _id_category)).toPromise();
      this.listbaivietchild = baivietChild ;

      this.listbaivietchild.forEach((e : any) => {
          e.update_at = datePipe.transform(new Date(e.updated_at), 'HH:mm dd/MM/yyyy');
      });

      console.log(this.listbaivietchild);
      this.isLoading = false ;
      this.isDanhmuc = false ;


    } catch (error) {
      console.error(error);
    }
  }



}

