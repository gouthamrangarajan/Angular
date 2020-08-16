import { createAction, props } from '@ngrx/store';

export const init = createAction(
    '[Table] init',    
  );
  export const nextPage = createAction(
    '[Table] nextPage',    
  );
  export const prevPage = createAction(
    '[Table] prevPage',    
  );

  export const filterRecords=createAction(
    '[Nav] filter',
    props<{txt:String}>()
  );