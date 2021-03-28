import { Action, Store } from './types';

export default function (
  createStore: (
    arg0: (
      state: { value: number } | undefined,
      action: Action<any>
    ) => { value: number }
  ) => Store<{ value: number }, Action<string>>
) {
  function counterReducer(state = { value: 0 }, action: Action<string>) {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 };
      case 'counter/decremented':
        return { value: state.value - 1 };
      default:
        return state;
    }
  }

  return describe('redux basics', () => {
    let store: Store<{ value: number }, Action<string>>;

    beforeEach(() => {
      store = createStore(counterReducer);
    });

    test('dispatch incremented', () => {
      store.dispatch({ type: 'counter/incremented' });
      const state = store.getState();
      expect(state).toEqual({ value: 1 });
    });

    test('dispatch decremented', () => {
      store.dispatch({ type: 'counter/decremented' });
      const state = store.getState();
      expect(state).toEqual({ value: -1 });
    });

    test('initial state', () => {
      const state = store.getState();
      expect(state).toEqual({ value: 0 });
    });

    test('subscription', () => {
      const mockF1 = jest.fn();
      const mockF2 = jest.fn();

      const unsubscribe1 = store.subscribe(mockF1);
      expect(mockF1).not.toHaveBeenCalled();

      store.dispatch({ type: 'counter/incremented' });
      expect(mockF1).toHaveBeenCalledTimes(1);
      expect(mockF2).not.toHaveBeenCalled();

      const unsubscribe2 = store.subscribe(mockF2);
      store.dispatch({ type: 'counter/decremented' });
      expect(mockF1).toHaveBeenCalledTimes(2);
      expect(mockF2).toHaveBeenCalledTimes(1);

      unsubscribe1();
      store.dispatch({ type: 'counter/incremented' });
      expect(mockF1).toHaveBeenCalledTimes(2); // mockF1 shouldn't be called.
      expect(mockF2).toHaveBeenCalledTimes(2);
    });
  });
}
