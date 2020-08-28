import ChannelMsg from '../../models/ChannelMsg';
import { createReducer, on, Action } from '@ngrx/store';
import * as ChannelMsgsActions from '../actions/channel-msgs.actions'

export const initialState={
    data:[] as ChannelMsg[]
}

const reducer=createReducer(initialState,
    on(ChannelMsgsActions.loadMsgsSuccess,(state,{payload})=>(
        {data:payload}
    ))
  )

export function channelMsgsReducer(state:{data:ChannelMsg[]}|undefined,action:Action){
    return reducer(state,action);
}