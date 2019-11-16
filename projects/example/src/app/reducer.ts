import { Action } from '@nanux/store';

export enum TODOs {
  GET_DATA = '[UI] INCREMENT'
}

export interface State {
  counter: number;
}

export const initialState: State = {
  counter: 0
};

export const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case TODOs.GET_DATA: {
      return { ...state, counter: state.counter + 1 };
    }
    default:
      return state;
  }
};
