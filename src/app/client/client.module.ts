import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CommonClientComponent } from './common-client/common-client.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';

import { WorkComponent } from './work/work.component';
import { HeaderComponent } from './common-client/header/header.component';
import { FooterComponent } from './common-client/footer/footer.component';
import { WorkdetailComponent } from './work/workdetail/workdetail.component';
import { FormsModule } from '@angular/forms';
import { TimkiemComponent } from './timkiem/timkiem.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    CommonClientComponent,
    ContactComponent,
    DetailComponent,
    HomeComponent,
    LoadingComponent,
    WorkComponent,
    HeaderComponent,
    FooterComponent,
    WorkdetailComponent,
    TimkiemComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule
  ]
})
export class ClientModule { }
