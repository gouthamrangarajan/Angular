import  {createAction,props} from '@ngrx/store'
import ChannelInfo from '../../models/ChannelInfo';


export const load = createAction(
    '[Channels-body] Load Channels'
)

export const loadSuccess = createAction(
    '[Channels-body] Load Channels Success',
    props<{payload:ChannelInfo[]}>()
)

export const search = createAction(
    '[Channels-search] Search Channels',
    props<{txt:string}>()
)

export const create=createAction(
    '[Channels-body] Create Channel',
    props<{name:string}>()
)

export const createCompleted=createAction(
    '[Channels-body] Create Channel Completed',
    props<{result:Boolean}>()
)

export const channelAdded=createAction(
    '[Channels-info service] Add Channel',
    props<{payload:ChannelInfo}>()
)


