import {createAction, props} from '@ngrx/store';
import ChannelMsg from '../../models/ChannelMsg';

export const loadMsgs=createAction(
    '[Window] Load Messages',
    props<{channelName:string}>()
)

export const loadMsgsSuccess=createAction(
    '[Window] Load Messages Success',
     props<{payload:ChannelMsg[]}>()
)