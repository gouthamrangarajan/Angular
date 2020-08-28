import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {debounceTime,map,distinctUntilChanged} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {Store} from '@ngrx/store';
import * as channelInfoActions from '../store/actions/channels-info.actions';
import ChannelInfo from './../models/ChannelInfo';

interface State{
  channels:ChannelInfo[]
}

@Component({
  selector: 'app-channels-search',
  templateUrl: './channels-search.component.html',
  styleUrls: ['./channels-search.component.scss']
})
export class ChannelsSearchComponent implements OnInit,AfterViewInit {
  @ViewChild('search',{static:false}) searchField:ElementRef;  
  constructor(private store: Store<State>) { }

  ngOnInit(): void {

  }
  ngAfterViewInit():void{
    fromEvent(this.searchField.nativeElement,'keyup').pipe(
      map((event:any)=>{        
        return {value:event.target.value,key:event.key};
      })
      ,debounceTime(500)
      ,distinctUntilChanged()
    ).subscribe(({value,key})=>{                      
      this.store.dispatch(channelInfoActions.search({txt:value.trim()}));
      if(key=='Enter'){        
        this.store.dispatch(channelInfoActions.create({name:value.trim()}));
      }
    })
  }  
}
