import { Action, createStore, Store } from 'redux';

import createTests from './unified-tests';

createTests(createStore);
