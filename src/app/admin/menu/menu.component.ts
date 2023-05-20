import { Component } from '@angular/core';
import { Categories } from '../models/categories.model';
import { NgForm } from '@angular/forms';
import { Add_category } from '../models/add_category.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/services_admin/api.service';
import { Menus } from '../models/menus.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  items: any[] = [];
  menu: Menus = new Menus('', '' ,'');
  isValid: Boolean = false;
  listmenu: Categories[] = [];
  listselectdanhmuc: any = [];
  isLoading: Boolean = true;
  isAdd: Boolean = false;
  isDataChanged = false;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
    await this.getSelect();
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

  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          console.log(this.listselectdanhmuc);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }


  add() {
    this.isAdd = true;
    this.menu = new Menus('', '' , '');
  }

  edit(item: any) {
    console.log(item);
    this.isAdd = false;
    this.menu = new Menus(item._id, item.title, item.category_id );
  }

  async remove(item: any) {
    console.log(item);
    await this.del_api_menu(item);
  }

  async submit(data: NgForm) {
    this.isValid = true;
    if (data.valid) {
      if (this.isAdd) {
        this.add_api_menu();
      }
      if (!this.isAdd) {
        this.edit_api_menu();
      }
    }
  }

  async add_api_menu() {
      const object = {
        title: this.menu.title.toUpperCase(),
        category_id : this.menu.category_id
      };
       (await this.api.post('/addmenu', object)).toPromise();
      this.toastr.success(
        'Thêm danh mục thành công',
        `Đã thêm vào danh sách thành công`
      );
      this.getData() ;

  }

  async edit_api_menu() {
    const edit_menu = {
      _id: this.menu._id,
      title: this.menu.title.toUpperCase(),
      category_id: this.menu.category_id,
    };
     (await this.api.post('/editmenu', edit_menu)).toPromise();
    this.toastr.success(
      'Sửa danh mục thành công',
      `Đã sửa danh mục thành công`
    );
    this.getData() ;
  }

  async del_api_menu(item: any) {
    const _id = {
      _id: item._id,
    };
    (await this.api.post('/delmenu', _id)).toPromise();
    this.isLoading = true;
    this.isLoading = false;
    this.toastr.success(
      'Xóa danh mục thành công',
      `Đã xóa danh mục thành công`
    );
    this.getData();
  }
}
