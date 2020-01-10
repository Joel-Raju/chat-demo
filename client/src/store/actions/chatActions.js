import io from 'socket.io-client';
import uniqid from 'uniqid';

import { 
  UPDATE_MESSAGE_HISTORY, 
  CLIENT_ID,
  MESSAGE_TYPE,
  SET_CONNECTION_STATUS
} from '../constants';

const socket = io('http://localhost:3001', {
  query: {
    CLIENT_ID: CLIENT_ID
  }
});


const listenConnectionChange = () => dispatch => {
  socket.on('connect', () => {
    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: true,
    });
  });  

  socket.on('disconnect', () => {
    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: false,
    });
  })
};

const sendMessage = message => (dispatch, getState) => {
  const { friendsReducer } = getState();
  const messageTemplate = {
    message,
    type: MESSAGE_TYPE.SENT,
    receiverId: friendsReducer.activeReceiver.id,
    timestamp: Date.now(),
    id: uniqid(),
  };
  socket.emit('message', messageTemplate, function(res) {
    console.log('emit message');
  });

  dispatch({
    type: UPDATE_MESSAGE_HISTORY,
    payload: messageTemplate
  });
};

const listenForIncomingMessage = () => dispatch => {
  socket.on('message', message => {
    dispatch({
      type: UPDATE_MESSAGE_HISTORY,
      payload: message,
    });
  });
};

export {
  sendMessage,
  listenForIncomingMessage,
  listenConnectionChange,
};