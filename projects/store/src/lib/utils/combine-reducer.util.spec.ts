
import { Action } from '@nanux/store/public-api';
import { combineReducers } from './combine-reducer.util';

enum ACTIONS  {
  TEST1 = 'ACTION TEST',
  TEST2 = 'ACTION TEST2'
}

const initialStateTest1 = { foo: 1 };
const initialStateTest2 = { bar: 1 };
const globalState = { test1: initialStateTest1, test2: initialStateTest2 };

const reducers = {
  test1: (state = initialStateTest1, action: Action) => {
    switch (action.type) {
      case ACTIONS.TEST1: {
        return { ...state, foo: state.foo + action.payload };
      }
      default:
        return state;
    }
  },

  test2: (state = initialStateTest2, action: Action) => {
    switch (action.type) {
      case ACTIONS.TEST2: {
        return { ...state, bar: state.bar + action.payload };
      }
      default:
        return state;
    }
  },
};

describe('CombineReducers', () => {
  it('should return the new state', () => {
    const reducerMap = combineReducers(reducers);
    const resultAction1 = reducerMap(globalState, { type: ACTIONS.TEST1, payload: 1 });
    const resultAction2 = reducerMap(globalState, { type: ACTIONS.TEST2, payload: 1 });
    expect(resultAction1.test1.foo).toEqual(2);
    expect(resultAction2.test2.bar).toEqual(2);
  });
});
