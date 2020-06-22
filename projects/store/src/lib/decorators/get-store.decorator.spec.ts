import { async, TestBed } from '@angular/core/testing';
import { NanuxStore, Reducer, Store, Action } from '@nanux/store';
import { Observable, of } from 'rxjs';

import { ngAPI, GetStore } from './get-store.decorator';
import { Injectable } from '@angular/core';

const featureStateName = 'counter';
const featureInitialState = { counter: 0 };
const reducerExample = (state, { payload }) => ({ ...state, counter: state.counter + payload });

class MockState {
  public counter$: Observable<number>;

  @Reducer('ACTION')
  public increment = reducerExample;

  constructor(public store: Store) { }

  /**
   * Test cannot use Ivy yet. In order to write a unit test
   * these properties work as placeholders
   */
  // tslint:disable: member-ordering
  ɵfac = () => (this);
  ɵprov;
}

MockState.prototype.ɵprov = {};

class MockStore {
  config = { decorators: true };
  initialState = { };
  reducerMap = { };
  reducerAction = { };
  state = of({ [featureStateName]: featureInitialState });

  init() { }

  getState() {
    return this.initialState;
  }
}

describe('Selector', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NanuxStore.forRoot({
          decorators: true
        })
      ],
      providers: [MockStore],
      declarations: []
    }).compileComponents();
  }));

  it('should generate custom selectors automatically', () => {
    const mockStore = new MockStore();
    spyOn(ngAPI, 'getInjectable').and.returnValue(mockStore);
    const stateDecorated = GetStore(featureStateName, featureInitialState)(new MockState(mockStore as any));
    stateDecorated.ɵprov.factory();
    stateDecorated.counter$
    .subscribe((result) => {
      expect(result).toEqual(0);
    });
  });
});
