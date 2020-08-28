import { Component, OnInit, OnDestroy } from '@angular/core';
import ChannelInfo from './../models/ChannelInfo';
import {trigger,style,animate,transition,query,stagger, state} from '@angular/animations';
import {Store} from '@ngrx/store';
import {Observable, Subscription, pipe} from 'rxjs';
import * as channelInfoActions from '../store/actions/channels-info.actions';
import { skip } from 'rxjs/operators';


interface State{
  displayData:ChannelInfo[],
  srchTxt:string,
  lastCreateActionStatus:Boolean
}
interface Notification{
  display:Boolean,
  msg:String,
  type:String
}
@Component({
  selector: 'app-channels-body',
  templateUrl: './channels-body.component.html',
  styleUrls: ['./channels-body.component.scss'],
  animations:[
    trigger('recordsAnimation',[
      transition('*=>*',[
        query('li',style({transform:'translateX(2px)',opacity:0}),{optional:true}),
        query('li',
          stagger('1ms',[
            animate('300ms',style({transform:'translateX(0)',opacity:1}))
          ]),
          {optional:true}
          )
      ])
    ]),
    trigger('notificationAnimation',[
      state('false',style({
        opacity:0,
        transform:'translateY(2px)'
      })),
      state('true',style({
        opacity:1,
        transform:'translateY(0)'
      })),
      transition('* => *',[
        animate('0.3s')
      ])
    ])    
  ]
})

export class ChannelsBodyComponent implements OnInit,OnDestroy {
  ChannelInfoCollection:Observable<ChannelInfo[]>
  srchTxt:string='';
  notification:Notification={
    display:false,
    msg:'',
    type:''
  }
  private srchSubscription:Subscription;
  private notificationSubscription:Subscription;
  constructor(private store:Store<State>) { 
  
    
  } 

  ngOnInit(): void {
    this.store.dispatch(channelInfoActions.load());    
     this.ChannelInfoCollection=this.store.select(state=>state[0].displayData);  
     this.srchSubscription=this.store.select(state=>state[0].srchTxt).subscribe(el=>{
      this.srchTxt=el;
     }) 
     this.notificationSubscription=this.store.select(state=>state[0].lastCreateActionStatus).pipe(skip(1)).subscribe(el=>{        
        if(el==true)
        {
          this.notification.display=true
          this.notification.msg='Successfully created Channel...'
          this.notification.type='Success'
          setTimeout(()=>{this.notification.display=false;},3000);
        }
        else{
          this.notification.display=true
          this.notification.msg='Error creating Channel...'
          this.notification.type='Error'
          setTimeout(()=>{this.notification.display=false;},3000);
        }
     }) 
  }

  ngOnDestroy():void{
    this.srchSubscription.unsubscribe();
    this.notificationSubscription.unsubscribe();
  }

  isReceivedToday(dtString:string):Boolean{
    let dt:Date=new Date(dtString);    
    let today:Date=new Date();
    if(today.getDate()==dt.getDate() && today.getFullYear()==dt.getFullYear() && today.getMonth()==dt.getMonth())
        return true;
    else
      return false;
  }

  create():void{   
   if(this.srchTxt.trim()!=''){
      this.store.dispatch(channelInfoActions.create({name:this.srchTxt.trim()}));
   } 
  }
}
