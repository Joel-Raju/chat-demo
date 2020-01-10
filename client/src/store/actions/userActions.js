import { SET_ACTIVE_RECEIVER } from '../constants';

const setActiveReceiver = user => dispatch => {
  dispatch({
    type: SET_ACTIVE_RECEIVER,
    payload: user,
  })
};

export {
  setActiveReceiver,
};