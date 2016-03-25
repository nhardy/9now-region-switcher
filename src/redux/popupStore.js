import { Store } from 'react-chrome-redux';

import config from 'src/config';


export default new Store({
  portName: config.comms,
  state: {
    location: {
      state: null,
    },
  },
});
