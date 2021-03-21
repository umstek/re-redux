import { Subject } from 'rxjs';
import { scan, share, startWith } from 'rxjs/operators';

import { Action } from './types';

export function createStore<
  S = any,
  A extends Action = Action<any> & { [x: string]: any }
>(reducer: (state: S | undefined, action: A) => S) {
  // It is common practice to suffix observable stream variables with '$'.
  const subject$ = new Subject<A>();
  const state$ = subject$.pipe(
    startWith({ type: '@@INIT' } as A),
    scan(reducer, undefined),
    share()
  );
  let state: S | undefined;
  state$.subscribe((s) => (state = s));

  return {
    dispatch: subject$.next.bind(subject$),
    getState: () => state as S,
    subscribe: (listener: () => void) => {
      const subscription = state$.subscribe(listener);
      return subscription.unsubscribe.bind(subscription);
    },
  };
}
