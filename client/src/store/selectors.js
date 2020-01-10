import { createSelector } from 'reselect';

const friendsReducer = state => state.friendsReducer;

const chatReducer = state => state.chatReducer;

const activeReceiver = createSelector([friendsReducer], (friendsReducer) => friendsReducer.activeReceiver);

const messages = createSelector([chatReducer], (chatReducer) => chatReducer.messages);

const getConnectionStatus = createSelector([chatReducer], (chatReducer) => chatReducer.connectionStatus);

const getMessagesForActiveReceiver = createSelector([activeReceiver, messages], 
  (receiver, messages) => {
    if (!receiver || !receiver.hasOwnProperty('id') || !messages) {;
      return null;
    }
    return messages[receiver.id];
  });

export {
  activeReceiver,
  getMessagesForActiveReceiver,
  getConnectionStatus,
};