import { Action } from './types';

export function createStore<
  S = any,
  A extends Action = Action<any> & { [x: string]: any }
>(reducer: (state: S | undefined, action: A) => S) {
  let state: S = reducer(undefined, { type: '@@INIT' } as A);
  let listeners: (() => void)[] = [];

  return {
    dispatch: (action: A) => {
      state = reducer(state, action);
      listeners.forEach((f) => f());
    },
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((f) => f !== listener);
      };
    },
  };
}
