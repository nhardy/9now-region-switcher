import { PropTypes } from 'react';

import states from 'src/lib/states';


export const state = PropTypes.oneOf(Object.keys(states));
