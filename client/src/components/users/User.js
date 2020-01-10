import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledUser = styled.div`
  padding: 16px;
  display: flex;
  border: 0 1px 0 1px solid;
  cursor: pointer;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  & > img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  
  & > div {
    margin: 0 8px;
  }
`;

export default function User(props) {
  const { user, onSelected} = props;
  return(
    <StyledUser onClick={() => onSelected(user)}>
      <img src={user.profileImage} alt={user.name} />
      <div>{user.name}</div>
    </StyledUser>
  )
};


User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  onSelected: PropTypes.func.isRequired,
};