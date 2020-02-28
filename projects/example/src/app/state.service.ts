import { Injectable } from '@angular/core';
import { Action, Reducer, GetStore, Store } from '@nanux/store';
import { TODOs, State } from './reducer';
import { Observable, empty } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
@GetStore('counter', { counter: 0, emojis: [] })
export class AppState {

  public counter$: Observable<number>;
  public emojis$: Observable<string[]>;

  @Reducer(TODOs.GET_DATA)
  public increment = (state, { payload }): State => ({ ...state, counter: state.counter + payload })

  @Reducer(TODOs.GET_EMOJIS_SUCCESS)
  public emojisSuccess = (state, { payload }): State => ({ ...state, emojis: payload })

  constructor(
    public store: Store,
    public api: ApiService
  ) { }

  public increaseCounter(): void {
    this.store.dispatch(new Action(TODOs.GET_DATA, 1));
  }

  public getMyFavoriteEmojis() {
    this.store.dispatch(new Action(TODOs.GET_EMOJIS));

    const request$ = this.api.getBestEmojis().pipe(
      tap((data) => this.store.dispatch(new Action(TODOs.GET_EMOJIS_SUCCESS, data))),
      catchError(() => {
        this.store.dispatch(new Action(TODOs.GET_EMOJIS_FAIL));
        return empty();
      }));

    return request$.subscribe();
  }

}
