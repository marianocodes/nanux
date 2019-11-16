import { Injectable } from '@angular/core';
import { Action, Reducer,  GetStore, Store } from '@nanux/store';
import { TODOs } from './reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@GetStore('counter', { counter: 0 })
export class AppService {

  public counter$: Observable<number>;

  @Reducer(TODOs.GET_DATA)
  public increment = (state, { payload }) => ({ ...state, counter: state.counter + payload });

  constructor(public store: Store) { }

  public dispatch()  {
    this.store.dispatch(new Action(TODOs.GET_DATA, 1));
  }

}
