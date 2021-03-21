export interface Action<T = any> {
  type: T;
}

export interface Store<S = any, A extends Action<any> = Action<any>> {
  getState: () => S;
  dispatch: (action: A) => void;
  subscribe: (listener: () => void) => () => void;
}
