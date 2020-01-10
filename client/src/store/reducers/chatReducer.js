import { UPDATE_MESSAGE_HISTORY, SET_CONNECTION_STATUS } from '../constants';


const INITIAL_STATE = {
  messages: {},
  connectionStatus: false,
};

export default function (state = INITIAL_STATE, action = {}) {
  switch(action.type) {

    case UPDATE_MESSAGE_HISTORY:
      const messageTemplate = {
        message: action.payload.message,
        type: action.payload.type,
        timestamp: action.payload.timestamp,
        id: action.payload.id,
      };
      return { 
        ...state,
        messages: {...state.messages, 
          [action.payload.receiverId]: (state.messages[action.payload.receiverId]) ? 
          state.messages[action.payload.receiverId].concat(messageTemplate)
          : ([].concat(messageTemplate))
        }
      };

    case SET_CONNECTION_STATUS:
      return { ...state, connectionStatus: action.payload };

    default:
      return state;
  }
}