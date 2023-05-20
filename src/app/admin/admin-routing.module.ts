import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonAdminComponent } from './common-admin/common-admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { PostsComponent } from './posts/posts.component';
import { AddPostsComponent } from './posts/add-posts/add-posts.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthSGuard } from './guards/auth-s.guard';
import { EditPostsComponent } from './posts/edit-posts/edit-posts.component';
import { MenuComponent } from './menu/menu.component';
import { IndexmenuComponent } from './menu/indexmenu/indexmenu.component';
import { GiaodienComponent } from './giaodien/giaodien.component';




const routes: Routes = [
  {path : '' , component : CommonAdminComponent, children : [
      {path : '' , component : HomeComponent , canActivate : [AuthGuard]},
      {path : 'login' , component : LoginComponent , canActivate : [AuthSGuard]},
      {path : 'danhmuc' , component : DanhmucComponent  , canActivate : [AuthGuard]},
      {path : 'baiviet' , component : PostsComponent  , canActivate : [AuthGuard] },
      {path : 'baiviet/add' , component : AddPostsComponent, canActivate : [AuthGuard]},
      {path : 'baiviet/edit' , component : EditPostsComponent, canActivate : [AuthGuard]},
      {path : 'menu' , component : MenuComponent, canActivate : [AuthGuard]},
      {path : 'giaodien' , component : GiaodienComponent, canActivate : [AuthGuard]},
      {path : 'menu/index' , component : IndexmenuComponent, canActivate : [AuthGuard]},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
  ]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
