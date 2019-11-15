import { ɵɵdirectiveInject } from '@angular/core';
import { Store } from './store.service';
import { select } from './utils/selector.util';

// TODO: change helper functions to be more functional insteaf of modifing properties by reference

/**
 * This function create and inject the selectors corresponding to the state.
 * Be aware that this a mutant function
 * @param {store} store - Root store instance
 * @param stateSelected - Name of state created
 * @param cmp - Symbol where the `GetDecorator` is  being used
 */
const generateSelectors = (store, stateSelected, cmp) => {
  // exponse only the state selected
  const schemaState: string | Record<string, any> = store.getState();

  // Create selectors and add them to component/service
  (Object.keys(schemaState[stateSelected] || [])).map((key) => {
    cmp[key + '$'] = store.state.pipe(
      select(
        (state) => state[stateSelected],
        (state) => state[key]
      )
    );
  });
}

const initDecoratorState = (store: Store, stateSelected: string, initialState) => {
  store.initialState = { ...store.initialState, [stateSelected]: initialState };
  store.init(); // subscrube to dispatch and init redux store
}

const initDecoratorReducer = (store: Store, stateSelected: string, cmp) => {
  const reducerMap = store.reducerMap;
  if (cmp.reducerAction) {
    Object.keys(cmp.reducerAction).map((key) => cmp.reducerAction[key].state = stateSelected);
    store.reducerMap = { ...reducerMap, ...cmp.reducerAction };
  }
}

export function GetStore(stateSelected: string, initialStateDecorator?) {
  return (cmpType) => {
    const originalFactory = cmpType.ɵfac;
    cmpType.ɵfac = (...args) => {
      const cmp = originalFactory(...args);
      const store: Store = ɵɵdirectiveInject(Store);

      if (store.config.decorators) {
        initDecoratorState(store, stateSelected, initialStateDecorator);
        initDecoratorReducer(store, stateSelected, cmp)
      }

      generateSelectors(store, stateSelected, cmp);

      return cmp;
    };

    return cmpType;
  };
}
