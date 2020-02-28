import { pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

// tslint:disable-next-line: variable-name only-arrow-functions
export const select = function(..._cb: ((state) => void)[]) {
  const args: any = [...arguments];
  return pipe(
    map((state = {}) => args.reduce((acc, selector) => selector(acc), state)),
    distinctUntilChanged()
  );
};
