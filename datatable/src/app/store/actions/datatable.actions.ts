import { createAction, props } from '@ngrx/store';

export const fetch = createAction(
    '[Table] fetch',    
  );

  export const filterRecords=createAction(
    '[nav] filter',
    props<{txt:String}>()
  );