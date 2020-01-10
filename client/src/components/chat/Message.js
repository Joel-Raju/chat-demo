import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { MESSAGE_TYPE } from '../../store/constants';


const StyledMessage = styled.li`
  padding: 8px;
  display: block;
  max-width: 320px;
  background-color: ${props => props.type === MESSAGE_TYPE.SENT ? "#81ecec": "#dfe6e9" };
  margin-top: 16px;
  margin-left: 16px;
  border-radius: 2px;

  &>:first-child {
    font-style: italic;
    color: #e74c3c;
    margin-bottom: 8px;
  }

  &>:last-child {
    text-align: right;
    font-size: 0.75rem;
    margin-top: 8px;
  }

`;

const Message = (props) => {
  const { message, receiver } = props;
  return(
    <StyledMessage type={message.type}>
      <div>{message.type === MESSAGE_TYPE.SENT ? 'You': receiver.name }</div>
      <div>{message.message}</div>
      <div>{moment(message.timestamp).format('LLLL')}</div>
    </StyledMessage>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }),
  receiver: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default Message;