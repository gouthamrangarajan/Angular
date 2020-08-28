import {Injectable} from '@angular/core';
import {Actions,createEffect,ofType} from '@ngrx/effects';
import{map,mergeMap} from 'rxjs/operators';
import {ChannelsInfoService} from '../../channels-info.service';
import { EMPTY } from 'rxjs';
import * as channelsInfoActions from '../actions/channels-info.actions';

@Injectable({
    providedIn:'root'
})

export class ChannelsInfoEffects{
    constructor(private actions:Actions,private channelsInfoService:ChannelsInfoService){

    }
    loadChannelsInfoEffect=createEffect(()=>             
        this.actions.pipe(
            ofType(channelsInfoActions.load),       
            mergeMap(()=>this.channelsInfoService.getAll()             
            .pipe(
                map(channels=>channelsInfoActions.loadSuccess({payload:channels}))
            ))                
        )                
    )
    createChannelEffect=createEffect(()=>
        this.actions.pipe(
            ofType(channelsInfoActions.create),
            mergeMap(({name})=>this.channelsInfoService.createChannel(name)
            .pipe(
                map((value:Boolean)=>channelsInfoActions.createCompleted({result:value}))
            ))
        )
    )

           
}
