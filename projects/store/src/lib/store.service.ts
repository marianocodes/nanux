import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { Action } from './models/actions.model';
import { combineReducers } from './utils/combine-reducer.util';
import { StoreConfig } from './models/config.model';
import { CONFIG_TOKEN } from './utils/tokens';

@Injectable({
  providedIn: 'root',
})
export class Store<T = any> {
  private _state: BehaviorSubject<T | {}>;
  private _dispatcher: BehaviorSubject<Action>;

  public state: Observable<T | {}>;
  public actions: Observable<Action>;

  constructor(@Inject(CONFIG_TOKEN) config: StoreConfig) {
    this._dispatcher = new BehaviorSubject({ type: 'Nanux Store Init Action' });
    this._state = new BehaviorSubject({});
    this.state = this._state.asObservable();
    this.actions = this._dispatcher.asObservable();

    const connectTools = this.setUpReducer(config);

    this._dispatcher
      .pipe(
        scan(connectTools, {}),
        shareReplay(1)
      )
      .subscribe(data => this._state.next(data));
  }

  public dispatch(action: Action) {
    this._dispatcher.next(action);
  }

  public getState(): Record<string, any> {
    return this._state.getValue();
  }

  private setUpReducer(config: StoreConfig): (state, action) => (Record<string, any>) {
    const win = window as any;
    config.debugMode && (win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect());

    return (state, action) => {
      const next = combineReducers(config.reducerMap)(state, action);
      config.debugMode && win.devTools.send(action.type, next);
      return next;
    };
  }
}
