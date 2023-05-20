import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './client/error/error.component';

const routes: Routes = [
  {path : "" , loadChildren : () => import('./client/client.module').then(m => m.ClientModule)} ,
  {path : "admin" , loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)} ,
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
