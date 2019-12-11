import { Action } from '@nanux/store';

export enum TODOs {
  GET_DATA = '[UI] INCREMENT',
  GET_EMOJIS = '[API] GET FAVORITE EMOJIS',
  GET_EMOJIS_SUCCESS = '[API]  GET FAVORITE EMOJIS SUCCESS',
  GET_EMOJIS_FAIL = '[API]  GET FAVORITE EMOJIS FAIL'
}

export interface State {
  counter: number;
  emojis: string[];
}

export const initialState: State = {
  counter: 0,
  emojis: []
};

export const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case TODOs.GET_DATA: {
      return { ...state, counter: state.counter + action.payload };
    }
    case TODOs.GET_EMOJIS_SUCCESS: {
      return { ...state, emojis: action.payload };
    }
    default:
      return state;
  }
};
