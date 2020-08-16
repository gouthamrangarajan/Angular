import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store'
import { Observable } from 'rxjs';

import {data} from '../models/data'
import { map,count } from 'rxjs/operators';
import {trigger,style,animate,transition,query,stagger} from '@angular/animations'

export interface State{
  data:any
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations:[
    trigger('recordsAnimation',[
      transition('*=>*',[
        query('tr',style({transform:'translateX(2px)',opacity:0})),
        query('tr',
          stagger('1ms',[
            animate('300ms',style({transform:'translateX(0)',opacity:1}))
          ]))
      ])
    ])
  ]
})

export class TableComponent implements OnInit {
  data:Observable<any[]>    

  constructor(private store: Store<State>) {
    let storeData:Observable<data>;
    storeData=this.store.select(state=>state.data);
    this.data=storeData.pipe(map(el=>el.tblData));
  
   }

  ngOnInit(): void {
  }

}
