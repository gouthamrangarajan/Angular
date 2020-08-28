import {Action,createReducer,on} from '@ngrx/store';
import * as channelsInfoActions from '../actions/channels-info.actions';
import ChannelInfo from '../../models/ChannelInfo';

export const initialState={
    data:[] as ChannelInfo[],
    displayData:[] as ChannelInfo[],
    srchTxt:'' as string,
    userName:'' as string,
    lastCreateActionStatus:false as Boolean
}

const  reducer=createReducer(initialState,
    on(channelsInfoActions.loadSuccess,(state,{payload})=>(
        {...state,data:payload,displayData:payload.filter(el=>{
            if(state.srchTxt==''){
                return true;
            }
            return el.name.toLowerCase().trim().indexOf(state.srchTxt.toLowerCase().trim())>-1;
        })}
    )),
    on(channelsInfoActions.search,(state,{txt})=>(
        {...state,srchTxt:txt,displayData:state.data.filter(el=>{
            if(txt==''){
                return true;
            }
            return el.name.toLowerCase().trim().indexOf(txt.toLowerCase().trim())>-1;
        })}
    )),
    on(channelsInfoActions.channelAdded,(state,{payload})=>(
        {...state,data:[...state.data,payload],displayData:[...state.displayData,payload]}
    )),
    on(channelsInfoActions.createCompleted,(state,{result})=>(
        {...state,lastCreateActionStatus:result}
    ))
)

export function channelsInfoReducer(state:undefined,action:Action){
    return reducer(state,action)
}