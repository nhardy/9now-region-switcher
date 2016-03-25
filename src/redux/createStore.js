import {
  applyMiddleware,
  createStore as _createStore,
} from 'redux';

import reducer from 'src/reducers';

export default function createStore(data) {
  const middlewares = [];
  const finalCreateStore = applyMiddleware(...middlewares)(_createStore);
  return finalCreateStore(reducer, data);
}
