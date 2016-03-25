import { wrapStore } from 'react-chrome-redux';

import config from 'src/config';
import createStore from './createStore';
import storage from 'src/lib/storage';


const store = createStore(storage.get());

wrapStore(store, {
  portName: config.comms,
});

export default store;
