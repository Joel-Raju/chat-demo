import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.css';
import './App.css';
import { ChatView, UsersView } from './components';
import configureStore from './store/configureStore';
import SearchBox from './components/users/SearchBox';
import Composer from './components/chat/Composer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container is-fullhd is-fullwidth">
          <div className="columns is-gapless">
            <div className="column is-one-third is-fullheight friends-list-container">
              <UsersView>
                {(searchQuery, onChangeSearchQuery) => (
                  <SearchBox
                    placeholder="Search for a friend"
                    searchQuery={searchQuery}
                    onChange={onChangeSearchQuery} />
                )}
              </UsersView>
            </div>
            <div className="column is-fullheight">
              <ChatView>
                {(sendMessage, disabled) => (
                  <>
                  <ToastContainer />
                  <Composer 
                    disabled={disabled}
                    sendMessage={sendMessage} />
                  </>
                )}
              </ChatView>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
