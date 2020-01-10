import { Reducer } from 'redux-testkit';
import chatReducer from './chatReducer';
import { 
  UPDATE_MESSAGE_HISTORY, 
  SET_CONNECTION_STATUS 
} from '../constants';


const INITIAL_STATE = {
  messages: {},
  connectionStatus: false,
};

describe('chatReducer', () => {
  it('should have initial state', () => {
    expect(chatReducer()).toEqual(INITIAL_STATE);
  });

  it('should not affect state', () => {
    Reducer(chatReducer).expect({type: 'NOT_EXISTING'}).toReturnState(INITIAL_STATE);
  });

  it('should update messages history', () => {
    const payload = {message: "testing", type: "RECEIVED", receiverId: 1, timestamp: 1541416514502, id: "g2pccciwjo47leiu"};
    const messagesTemplate = {
      message: payload.message,
      type: payload.type,
      timestamp: payload.timestamp,
      id: payload.id,
    };
    const action = {type: UPDATE_MESSAGE_HISTORY, payload: payload};
    Reducer(chatReducer).expect(action).toReturnState(
      { ...INITIAL_STATE,
        messages: {...INITIAL_STATE.messages, 
          [action.payload.receiverId]: (INITIAL_STATE.messages[action.payload.receiverId]) ? 
          INITIAL_STATE.messages[action.payload.receiverId].concat(messagesTemplate)
          : ([].concat(messagesTemplate))
        }
      });
  });

  it('should update connection status', () => {
    const action = {type: SET_CONNECTION_STATUS, payload: false };
    Reducer(chatReducer).expect(action).toReturnState({ ...INITIAL_STATE, connectionStatus: action.payload });
  });

});