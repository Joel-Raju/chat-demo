import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from './User';
import { setActiveReceiver } from '../../store/actions/userActions';

class UsersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.onUserSelected = this.onUserSelected.bind(this);
  }

  onChangeSearchQuery(event) {
    this.setState({ searchQuery: event.target.value });
  }

  onUserSelected(user) {
    const { setActiveReceiver } = this.props;
    setActiveReceiver(user);
    this.setState({ searchQuery: '' });
  }

  getFilteredFriends() {
    const { friendsList } = this.props;
    const { searchQuery } = this.state;
    return friendsList.filter(friend => friend.name.match(new RegExp(searchQuery, 'i')) );
  }

  render() {
    const { searchQuery } = this.state;
    return(
      <div>
        { this.props.children(searchQuery, this.onChangeSearchQuery) }
        { this.getFilteredFriends().map(friend => {
          return <User key={friend.id} user={friend} onSelected={this.onUserSelected} /> })
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { friendsReducer } = state;
  return {
    friendsList: friendsReducer.friendsList
  };
};

const mapDispatchtToProps = dispatch => bindActionCreators({
  setActiveReceiver,
}, dispatch);

UsersView.propTypes = {
  friendsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  })),
  setActiveReceiver: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchtToProps)(UsersView);