import { combineReducers } from 'redux';
import friendsReducer from './friendsReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  chatReducer,
  friendsReducer,
});

export default rootReducer;