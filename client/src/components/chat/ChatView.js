import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sendMessage, listenForIncomingMessage, listenConnectionChange } from '../../store/actions/chatActions';
import { 
  getMessagesForActiveReceiver, 
  activeReceiver,
  getConnectionStatus,
} from '../../store/selectors';
import { toast } from 'react-toastify';
import Message from './Message';


const ChatViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  &>:first-child {
    display: flex;
    flex-direction: row;
    padding: 16px;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    

    & > img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    & > div {
      margin:0 16px;
      font-size: 1.5rem;
      font-weight: bolder;
    }
  }

  &>:nth-child(2) {
    height: calc(100vh - 108px - 3.25rem);
    overflow-y: auto;
    margin-left: 16px;
    & > ul {
      display: flex;
      flex-direction: column;  
    }
  }

  &>:last-child {
    margin-top: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  &>p {
    box-shadow: none !important;
    color: red;
  }
`;


class ChatView extends Component {

  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.MessagesRef = React.createRef();
  }

  componentDidMount() {
    const { listenForIncomingMessage, listenConnectionChange } = this.props;
    listenConnectionChange();
    listenForIncomingMessage();
  }

  sendMessage(message) {
    const { sendMessage } = this.props;
    sendMessage(message);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.connectionStatus !== this.props.connectionStatus) {
      if (this.props.connectionStatus) {
        this.notify('Connection established');
      } else {
        this.notify('Connection lost. Reconnecting');
      }
    }

    if (this.MessagesRef.current) {
      this.MessagesRef.current.scrollTop  = this.MessagesRef.current.scrollHeight;  
    }
  }

  notify = (messages) => toast(messages);

  render() {
    const { messages, receiver, connectionStatus } = this.props;
    return(
      <ChatViewContainer>
        { (!receiver || !receiver.id) && <p>Please choose a freind</p> }
        { receiver && receiver.id && 
          <>
          <div>
            <img src={receiver.profileImage} alt={receiver.name} />
            <div>{receiver.name}</div>
          </div>
          <div ref={this.MessagesRef}>
            { messages && messages.length && 
              <ul>
              {
                messages.map(message => 
                  <Message 
                    key={message.id}
                    message={message}
                    receiver={receiver}
                    disabled={!connectionStatus} />
                )
              }
              </ul> 
            }
          </div>
          { this.props.children(this.sendMessage, !connectionStatus) }
          
          </>
        }
      </ChatViewContainer>
    );
  }
};

const mapStateToProps = state => {
  return {
    messages: getMessagesForActiveReceiver(state),
    receiver: activeReceiver(state),
    connectionStatus: getConnectionStatus(state),
  };
};

const mapDispatchToProps = () => dispatch => bindActionCreators({
  sendMessage,
  listenForIncomingMessage,
  listenConnectionChange,
}, dispatch);

ChatView.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  listenForIncomingMessage: PropTypes.func.isRequired,
  listenConnectionChange: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })),
  receiver: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);