import { async, TestBed } from '@angular/core/testing';
import { Store, CONFIG_TOKEN, Action, initAction, NanuxStore, GetStore, ngAPI } from '@nanux/store';
import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const featureStateName = 'state';
const featureInitialState = { counter: 0 };
const reducerDecoratorExample = (state, { payload }) => {
  return ({ ...state, counter: state.counter + payload });
};
const ACTION = 'MOC_ACTION_INCREMENT';
const reducerTraditionalExample = (state, { payload, type }) => {
  switch (type) {
    case ACTION:
      return reducerDecoratorExample(state, { payload });
    default:
      return state;
  }
};

const reducerMapMock = {
  [featureStateName]: reducerTraditionalExample
};

// export class MockState {

//   public counter$: Observable<number>;

//   constructor(
//     public store: Store
//   ) { }

//   public increaseCounter(): void {
//     this.store.dispatch(new Action(ACTION, 1));
//   }

// }

class MockStateTraditional {
  public counter$: Observable<number>;
  /**
   * Test cannot use Ivy yet. In order to write a unit test
   * these properties work as placeholders
   */
  // tslint:disable: member-ordering
  ɵfac = () => (this);
  ɵprov;

  constructor(public store: Store) { }


  public increaseCounter(): void {
    this.store.dispatch(new Action(ACTION, 1));
  }

}

MockStateTraditional.prototype.ɵprov = {};

let storeService: MockStateTraditional;

const spySend = jasmine.createSpy();
(window as any).__REDUX_DEVTOOLS_EXTENSION__ = { connect: () => ({ send: spySend }) };

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

describe('Store service', () => {

  // describe('debug mode on', () => {

  // });

  describe('using traditional decorators', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          NanuxStore.forRoot({
            reducerMap: reducerMapMock
          })
        ],
        providers: [
          { provide: CONFIG_TOKEN, useValue: { reducerMap: { ...reducerMapMock } } },
          // MockStateTraditional
        ],
        declarations: []
      }).compileComponents();

      // storeService = TestBed.inject(MockStateTraditional);

      const mockStore = new MockStore();
      spyOn(ngAPI, 'getInjectable').and.returnValue(mockStore);
      const storeService = GetStore(featureStateName, featureInitialState)(new MockStateTraditional(mockStore as any));
      storeService.ɵprov.factory();

    }));

    it('should trigger the init action', () => {
      storeService.store.actions.pipe(take(1)).subscribe(({ type }) => {
        expect(type).toBe(initAction.type);
      });

      storeService.increaseCounter();

      const currentState = storeService.store.getState();

      // expect(currentState[featureStateName].counter).toBe(1);
      console.log(currentState);
    });

  });

});

// describe('using reducer decorators', () => {

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: CONFIG_TOKEN, useValue: { decorators: true, debugMode: true } },
//         Store
//       ],
//       declarations: []
//     }).compileComponents();

//     storeService = TestBed.inject(Store);
//     storeService.reducerMap = {
//       [ACTION]: {
//         state: featureStateName,
//         func: reducerDecoratorExample
//       }
//     };

//     storeService.initialState = { [featureStateName]: featureInitialState };

//   }));

//   it('should reduce the action', () => {

//     storeService.init();

//     storeService.actions.pipe(take(1)).subscribe(({ type }) => {
//       expect(type).toBe(initAction.type);
//       expect(spySend).toHaveBeenCalled();
//     });

//     storeService.dispatch(new Action(ACTION, 1));

//     const currentState = storeService.getState();

//     expect(currentState[featureStateName].counter).toBe(1);

//   });
// });
