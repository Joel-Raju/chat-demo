import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSearch = styled.input`
  height: 4rem;
  border: none;
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid rgba(0,0,0,.75);
`;


const SearchBox = (props) => {
  const { searchQuery, onChange, placeholder } = props;
  return (
    <div>
      <StyledSearch 
        placeholder={placeholder}
        type="text" 
        value={searchQuery} 
        className="input" 
        onChange={onChange} />
    </div>
  );
};

SearchBox.propTypes = {
  searchQuery: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default SearchBox;