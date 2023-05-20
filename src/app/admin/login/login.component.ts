import { Component } from '@angular/core';
import { Users } from '../models/users.model';
import { ApiService } from 'src/app/services_admin/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataAdminService } from 'src/app/services_admin/data-admin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isValid : Boolean = false ;
  user : Users = new Users;
  isLoading : Boolean = false ;
  constructor(private api : ApiService , private router : Router , private dataadminService : DataAdminService , private toastr : ToastrService) {

  }



  async submit(data : NgForm) {
    this.isValid = true ;
    if(data.valid) {
      console.log(this.user);
      (await this.api.post("/login" , this.user)).subscribe(
        (v: any) => {
          this.isLoading = true ;
          sessionStorage.setItem('user' , JSON.stringify(v));
          setTimeout(() => {
            this.dataadminService.isLogin = true , this.router.navigate(['/home']) , this.isLoading = false ,  window.location.reload();
          } , 1000)
          this.toastr.success('Đăng nhập thành công', `Xin chào ${v.username}`);
        },
        (err) => {
          this.toastr.error('Đăng nhập thất bại' , 'Tài khoản không đúng');
        })
    }
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }


}
