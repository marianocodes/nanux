import { pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export const select = function(..._cb: Function[]) {
  const args: any = [...arguments];
  return pipe(
    map((state = {}) => args.reduce((acc, selector) => selector(acc), state)),
    distinctUntilChanged()
  );
};
