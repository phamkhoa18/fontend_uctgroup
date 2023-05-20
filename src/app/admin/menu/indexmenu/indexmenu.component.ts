import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/services_admin/api.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-indexmenu',
  templateUrl: './indexmenu.component.html',
  styleUrls: ['./indexmenu.component.scss']
})
export class IndexmenuComponent {

  isLoading : Boolean = true ;
  listmenu : any ;
  constructor(private api : ApiService , private toastr : ToastrService) {
      this.getData() ;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listmenu, event.previousIndex, event.currentIndex);
    console.log(this.listmenu);
  }


  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listmenu')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listmenu = v ;
          console.log(this.listmenu);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  save () {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thay đổi ? ',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn'
    }).then( async (result) => {
      this.isLoading = true ;
      if (result.isConfirmed) {
        const menuarraynew = {
          menuarraynew : this.listmenu
        };
        (await this.api.post('/update_index_menu' , menuarraynew)).subscribe((res : any) => {
            this.isLoading = false ;
            if(res.status == 200) {
              this.toastr.success('Thay đổi vị trí thành công', 'Thành công');
            } else {
              this.toastr.error('Thay đổi vị trí thất bại' , 'Thất bại');
            }
        })
      }
    })
  }
}
