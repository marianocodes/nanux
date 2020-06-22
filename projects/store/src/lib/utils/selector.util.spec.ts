import { select } from './selector.util';
import { of } from 'rxjs';

describe('Selector', () => {
  it('should return a piece of the state', () => {
    const globalState = { featureState: { test: 'this a feature state' }};
    of(globalState)
      .pipe(
        select(
          (state) => state.featureState,
          (state) => state.test
        )
      ).subscribe(result => {
        expect(result).toEqual(globalState.featureState.test);
      });
  });
});
