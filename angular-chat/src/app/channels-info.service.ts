import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ChannelInfo from './models/ChannelInfo';
import { Observable, Subject,timer, from } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import {Store} from '@ngrx/store';
import * as channelInfoActions from './store/actions/channels-info.actions';
import { environment } from 'src/environments/environment';

interface State{
  userName:string
}
@Injectable({
  providedIn: 'root'
})
export class ChannelsInfoService {

  private hubConnection:signalR.HubConnection
  private data:Subject<ChannelInfo[]>=new Subject<ChannelInfo[]>()      
  private apiUrl:string=environment.ApiUrl
  private signalRUrl:string=environment.SignalRUrl
  private user:string='';
  
  constructor(private store:Store<State>,private http:HttpClient) {    
    this.connectSignalR();
    this.store.select(state=>state[0].userName).subscribe(el=>{
      this.user=el;
    })
  }
  private connectSignalR():void{    
    const numbers= timer(1,3000)
    const subscription= numbers.subscribe((val)=>{
      this.hubConnection=new signalR.HubConnectionBuilder().withUrl(this.signalRUrl+'hubs/channelsInfo').build();            
      this.hubConnection.start().then(()=>{
        console.log('Channel Info hub started');
        subscription.unsubscribe();    
      }).catch(err=>{      
        if(val==5){
          console.log('maximum try to connect completed')
          subscription.unsubscribe()
        }
        console.log(err);
      });     
     this.hubConnection.on('ChannelCreated',dt=>{
        this.store.dispatch(channelInfoActions.channelAdded({payload:dt}));
     })
      this.hubConnection.onclose((err)=>{
        console.log('caught error')
        this.connectSignalR()
      })
    })
  }
  getAll():Observable<ChannelInfo[]>{                                   
      return this.http.get<ChannelInfo[]>(this.apiUrl+'api/channels')
  }  
  createChannel(name:string):Observable<Boolean>{
    let user=this.user;
    if(user=='')
      user='anonymous'
    return from(this.hubConnection.invoke("CreateChannel",name,user).then(()=>{
      return  true;
    }).catch(()=>{
      return false;
    }))
  }
}
