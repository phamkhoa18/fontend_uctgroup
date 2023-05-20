import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AddPostsComponent } from './posts/add-posts/add-posts.component';
import { HeaderComponent } from './common-admin/header/header.component';
import { SidebarComponent } from './common-admin/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { LoadingComponent } from './loading/loading.component';
import { PostsComponent } from './posts/posts.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonAdminComponent } from './common-admin/common-admin.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxEditorModule } from 'ngx-editor';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EditPostsComponent } from './posts/edit-posts/edit-posts.component';
import { MenuComponent } from './menu/menu.component';
import { GiaodienComponent } from './giaodien/giaodien.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IndexmenuComponent } from './menu/indexmenu/indexmenu.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AddPostsComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    DanhmucComponent,
    LoadingComponent,
    PostsComponent,
    CommonAdminComponent,
    LoginComponent,
    EditPostsComponent,
    MenuComponent,
    GiaodienComponent,
    IndexmenuComponent,
    ContactComponent,



  ],
  imports: [
    AdminRoutingModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
    MatDialogModule,
    NgxEditorModule,
    CommonModule,
    DragDropModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
