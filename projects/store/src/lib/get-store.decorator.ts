import { ɵɵdirectiveInject } from '@angular/core';
import { Store } from './store.service';
import { select } from './utils/selector.util';

export function GetStore(stateSelected?: string[]) {
  return (cmpType) => {
    const originalFactory = cmpType.ɵfac;
    cmpType.ɵfac = (...args) => {
      const cmp = originalFactory(...args);
      const store = ɵɵdirectiveInject(Store);
      // exponse only the state selected
      const initialState: string | Record<string, any> = stateSelected || store.getState();

      (stateSelected || Object.keys(initialState)).map((key) => {
        cmp[key + '$'] = store.state.pipe(select((state) => state[key]));
      });

      return cmp;
    };
    return cmpType;
  };
}
