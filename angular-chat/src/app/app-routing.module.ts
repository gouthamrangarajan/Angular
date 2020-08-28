import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WindowComponent} from './window/window.component'

const routes: Routes = [
  {path:'',component:WindowComponent},
  {path:':channelName',component:WindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
