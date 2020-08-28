import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { ChannelsHeaderComponent } from './channels-header/channels-header.component';
import { ChannelsBodyComponent } from './channels-body/channels-body.component';
import { ChannelsSearchComponent } from './channels-search/channels-search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StoreModule} from '@ngrx/store';
import  {reducers,effects} from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import {EffectsModule} from '@ngrx/effects'

import { WindowHeaderComponent } from './window-header/window-header.component';
import { SendMessageComponent } from './send-message/send-message.component'


@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    ChannelsHeaderComponent,
    ChannelsBodyComponent,
    ChannelsSearchComponent,
    WindowHeaderComponent,
    SendMessageComponent     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states     
    }),
    EffectsModule.forRoot(effects),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
