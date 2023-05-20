import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonClientComponent } from './common-client/common-client.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { WorkdetailComponent } from './work/workdetail/workdetail.component';
import { TimkiemComponent } from './timkiem/timkiem.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path : '' , component : CommonClientComponent , children : [
      {path : 'trang-chu' , component : HomeComponent , pathMatch: 'full'},
      {path : 'vn/:name' , component : WorkComponent},
      {path : 'vn/:name/:name' , component : WorkdetailComponent},
      {path : 'lien-he' , component : ContactComponent},
      {path : 'tim-kiem/:name' , component : TimkiemComponent},
      {path : 'bai-viet/:name' , component : DetailComponent},
      {path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
