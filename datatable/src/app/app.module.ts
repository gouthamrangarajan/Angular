import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';
import * as dataTableReducer from './store/reducers/datatable.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    StoreModule.forRoot({data:dataTableReducer.reducer}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
