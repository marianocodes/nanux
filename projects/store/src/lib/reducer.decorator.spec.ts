import { Reducer } from '@nanux/store';

const reducerExample = (state, { payload }) => ({ ...state, counter: state.counter + payload });
const actionName = 'ACTION';
class MockState {
  @Reducer(actionName)
  public increment = reducerExample;
}

describe('Reducer decorator', () => {
  it('should reduce state by using a property with the decorator', () => {
    const initState = { counter: 1 };
    const payload = { payload: 1 };
    const state = new MockState();
    const resultPropReducer = state.increment(initState, payload);
    expect(resultPropReducer).toEqual({ counter: 2 });

    const resultDecorator = (state as any).reducerAction[actionName].func(initState, payload);
    expect(resultDecorator).toEqual({ counter: 2 });
  });
});
