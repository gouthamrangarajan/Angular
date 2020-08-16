import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,  
} from "rxjs/operators";

import { fromEvent } from 'rxjs';
import {Store} from '@ngrx/store';
import * as datatableActions  from '../store/actions/datatable.actions'

export interface State{
  data:any
}
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,AfterViewInit {
  @ViewChild("input", { static: false }) inputField:ElementRef;
  navRightClass:string='nav__right  w-8 inline-flex justify-end items-center overflow-hidden';
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit():void{
    fromEvent(this.inputField.nativeElement, 'keyup').pipe(      
      map((event: any) => {
        return event.target.value;
      })          
      , debounceTime(500)      
      , distinctUntilChanged()      
    ).subscribe((ftText: string) => {
       this.store.dispatch(datatableActions.filterRecords({txt:ftText}));
    })
  }

  toggleNavRightClass():void{
    if(this.navRightClass.indexOf('w-8')>-1){
      this.navRightClass='nav__right nav__right-finalWidth inline-flex justify-end items-center overflow-hidden';
      this.inputField.nativeElement.focus();
    }
    else
      this.navRightClass='nav__right w-8 inline-flex justify-end items-center overflow-hidden';
  }
  
}
