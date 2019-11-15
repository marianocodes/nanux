import { ɵɵdirectiveInject } from '@angular/core';
import { Store } from './store.service';
import { select } from './utils/selector.util';

export function GetStore(stateSelected: string, initialState?) {
  return (cmpType) => {
    const originalFactory = cmpType.ɵfac;
    cmpType.ɵfac = (...args) => {
      const cmp = originalFactory(...args);
      const store: Store = ɵɵdirectiveInject(Store);

      const newStateName = stateSelected;

      if (store.config.decorators) {
        if (!store.initialState) store.initialState = {};
        store.initialState = { ...store.initialState, [newStateName]: initialState };
        store.init();

        const reducerMap = store.reducerMap;
        if (!reducerMap) store.reducerMap = {};
        if (cmp.reducerAction) {
          Object.keys(cmp.reducerAction).map((key) => {
            cmp.reducerAction[key].state = newStateName;
          });
          store.reducerMap = { ...reducerMap, ...cmp.reducerAction };
        }
      }

      // exponse only the state selected
      const schemaState: string | Record<string, any> = store.getState();

      // Create selectors and add them to component/service
      (Object.keys(schemaState[stateSelected])).map((key) => {
        cmp[key + '$'] = store.state.pipe(
          select(
            (state) => state[stateSelected],
            (state) => state[key]
          )
        );
      });

      return cmp;

    };

    return cmpType;
  };
}
