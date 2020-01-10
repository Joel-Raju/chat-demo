import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledComposer = styled.div`
  display: flex;
  & > button {
    background: ${props => props.disabled ? "#a2a2a2": "#e74c3c" };
  }

  & > input, & > button {
    border-radius: 0;
    border: none;
    box-shadow: none;
  }
`;

export default class Composer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.onSendMessageHandler = this.onSendMessageHandler.bind(this);
    this.onClearComposer = this.onClearComposer.bind(this);
    this.onChangeMessageHandler = this.onChangeMessageHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onClearComposer() {
    this.setState({ message: '' });
  }

  onChangeMessageHandler(event) {
    this.setState({ message: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onSendMessageHandler();
    }
  }

  onSendMessageHandler() {
    const { sendMessage, disabled } = this.props;
    const { message } = this.state;
    if (disabled || !message) {
      return;
    }
    sendMessage(message);
    this.onClearComposer();
  }

  render() {
    const { message, disabled } = this.state;
    return(
      <StyledComposer disabled={disabled}>
        <input className="input" 
          type="text" 
          value={message}
          placeholder="type your message..."
          onChange={this.onChangeMessageHandler} onKeyPress={this.handleKeyPress} />
        <button className="button" onClick={this.onSendMessageHandler} disabled={disabled}>Send</button>
      </StyledComposer>
    );
  }
}

Composer.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

