export interface Action<T = any> {
  type: T;
}

export interface Store<
  S = any,
  A extends Action = Action & { [x: string]: any }
> {
  getState: () => S;
  dispatch: (action: A) => void;
  subscribe: (listener: () => void) => () => void;
}
