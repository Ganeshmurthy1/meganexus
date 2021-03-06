import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TodoComponent } from './component/todo/todo.component';
import { TodoTableComponent } from './component/todo-table/todo-table.component';
import { MegaPreferenceComponent } from './component/mega-preference/mega-preference.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full'},

  { path: 'todo/:fileInfoId', component: TodoTableComponent },
  { path: '', redirectTo: '/todo/:fileInfoId', pathMatch: 'full'},

  { path: 'todo/:fileInfoId/:path', component: TodoTableComponent },
  { path: '', redirectTo: '/todo/:fileInfoId/:path', pathMatch: 'full'},

  { path: 'mega-preference', component: MegaPreferenceComponent },
  { path: '', redirectTo: '/mega-preference', pathMatch: 'full'},


]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
