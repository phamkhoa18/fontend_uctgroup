import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services_admin/api.service';
import { HomeComponent } from '../../home/home.component';
import { Editor , Toolbar } from 'ngx-editor';

import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

declare var $ : any ;

export class Posts {
    title : String = '';
    id_select : String = '' ;
    image : String = '' ;
    content : String = '' ;
    outstanding : Boolean = false ;
}

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})


export class AddPostsComponent {
  editor: Editor = new Editor;
  html:any = '';
  htmlContent : String = '' ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = true ;
  post : Posts = new Posts() ;

  constructor ( private api : ApiService , private dialog: MatDialog , public sanitizer: DomSanitizer , private toastr : ToastrService){}

  async ngOnInit(): Promise<any> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.getSelect() ;
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  ngAfterViewInit(): void {
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
            title : this.post.title ,
            description : this.post.content ,
            category_id : this.post.id_select ,
            image : this.post.image ,
            outstanding : this.post.outstanding
        };
        (await this.api.post("/addnew" , post_r)).subscribe(
          (v: any) => {
            setTimeout(() => {
                this.isLoading = false ;
            } , 1000)

            this.toastr.success('Thêm bài viết thành công', `Bài viết mới đã được thêm`);
            this.post = new Posts();
          },
          (err) => {
            this.isLoading = false ;
            this.toastr.error('Thêm bài viết thất bại' , 'Vui lòng kiểm tra kết nối');
          })

    }
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(HomeComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '100%',
      height: '100%',
      panelClass: 'my-popup-dialog'
    });
  }




}
