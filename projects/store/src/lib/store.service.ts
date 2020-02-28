import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { Action } from './models/actions.model';
import { combineReducers } from './utils/combine-reducer.util';
import { StoreConfig } from './models/config.model';
import { CONFIG_TOKEN } from './utils/tokens';

const initAction = { type: '@@ INIT' };

@Injectable({
  providedIn: 'root',
})
export class Store<T = any> {
  private db: BehaviorSubject<T | {}>;
  private dispatcher: BehaviorSubject<Action>;
  private tools;
  public reducerMap;

  public state: Observable<T | {}>;
  public actions: Observable<Action>;
  public initialState: Record<string, any>;

  constructor(@Inject(CONFIG_TOKEN) public config: StoreConfig) {
    this.dispatcher = new BehaviorSubject(initAction);
    this.db = new BehaviorSubject({});
    this.state = this.db.asObservable();
    this.actions = this.dispatcher.asObservable();

    if (!this.config.decorators ) {
      this.init();
    }

  }

  public init() {
    const win = window as any;
    if (this.config.debugMode) {
      (this.tools = win.__REDUX_DEVTOOLS_EXTENSION__.connect());
    }
    const rootReducer = this.config.decorators ? this.reducerForDecorators(this.config) : this.reducerForCases(this.config);
    this.dispatcher
      .pipe(
        scan(rootReducer, this.initialState || {}),
        shareReplay(1),
      )
      .subscribe(data => this.db.next(data));
  }

  public dispatch(action: Action) {
    this.dispatcher.next(action);
  }

  public getState(): Record<string, any> {
    return this.db.getValue();
  }

  private reducerForCases(config: StoreConfig): (state, action) => (Record<string, any>) {
    return (state, action) => {
      const next = combineReducers(config.reducerMap)(state, action);
      if (config.debugMode) {
        this.tools.send(action.type, next);
      }
      return next;
    };
  }

  private reducerForDecorators(config: StoreConfig): (state, action) => (Record<string, any>) {
    return (state, action) => {
      const reducer = this.reducerMap && this.reducerMap[action.type] && this.reducerMap[action.type].func;
      let next = state;

      if (reducer)  {
        const stateToUpdate = this.reducerMap[action.type].state;
        const actionReduced = reducer(state[stateToUpdate], action);
        next = { ...state, [this.reducerMap[action.type].state]: { ...actionReduced }};
      }

      if (config.debugMode) {
        this.tools.send(action.type, next);
      }

      return next;
    };
  }
}
