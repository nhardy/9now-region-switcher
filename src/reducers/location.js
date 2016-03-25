import { SELECT_STATE } from 'src/actions/location';


export default function reducer(state = { state: null }, action) {
  switch (action.type) {
    case SELECT_STATE:
      return {
        ...state,
        state: action.state,
      };

    default:
      return state;
  }
}
