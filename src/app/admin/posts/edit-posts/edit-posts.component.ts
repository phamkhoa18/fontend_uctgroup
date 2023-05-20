import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services_admin/api.service';
import { HomeComponent } from '../../home/home.component';
import { Editor , Toolbar } from 'ngx-editor';

import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DataAdminService } from 'src/app/services_admin/data-admin.service';
import { Router } from '@angular/router';

declare var $ : any ;

export class Posts {
    _id : String = '' ;
    title : String = '';
    id_select : String = '' ;
    image : String = '' ;
    content : String = '' ;
    outstanding : Boolean = false ;

    constructor (_id : String , title : String , id_select : String , image : String , content : String , outstanding : Boolean) {
        this._id = _id ;
        this.title = title ;
        this.id_select = id_select;
        this.image = image ;
        this.content = content ;
        this.outstanding = outstanding
    }
}

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.scss']
})
export class EditPostsComponent {
  item : any ;
  editor: Editor = new Editor;
  html:any = '';
  htmlContent : String = '' ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = true ;
  post : Posts = new Posts('','','','','' , false) ;

  constructor ( private api : ApiService , private dialog: MatDialog , public sanitizer: DomSanitizer , private toastr : ToastrService , private dataadminservice : DataAdminService , private router : Router){}

  async ngOnInit(): Promise<any> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.getSelect() ;
    this.editor = new Editor();
    this.item = this.dataadminservice.isItem ;
    this.post = new Posts(this.item._id,this.item.title , this.item.category_id._id , this.item.image ,this.item.description , this.item.outstanding);

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

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

  onEditorContentChange(event: any) {
    this.post.content = event.html;
    console.log(this.post.content);

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
  };


  async submit(data : NgForm) {
    if(data.valid) {
        this.isLoading = true ;
        console.log(this.post);
        const post_r = {
            _id : this.post._id ,
            title : this.post.title ,
            description : this.post.content ,
            category_id : this.post.id_select ,
            image : this.post.image,
            outstanding : this.post.outstanding
        };
        (await this.api.post("/updatenew" , post_r)).subscribe(
          (v: any) => {
            setTimeout(() => {
                this.isLoading = false ;
            } , 1000)
            this.toastr.success('Sửa bài viết thành công', `Bài viết đã được sửa`);
            setTimeout(() => {
              this.router.navigate(['/admin/baiviet']);
            } , 1000);
          },
          (err) => {
            this.isLoading = false ;
            this.toastr.error('Sửa bài viết thất bại' , 'Vui lòng kiểm tra kết nối');
          })

    }
  }




}
