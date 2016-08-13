import { wrapStore } from 'react-chrome-redux';

import config from 'src/config';
import storage from 'src/lib/storage';

import createStore from './createStore';


const store = createStore(storage.get());

wrapStore(store, {
  portName: config.comms,
});

export default store;
