import { createStore } from './re-redux';
import { Action, Store } from './types';

import createTests from './unified-tests';

createTests(createStore);
