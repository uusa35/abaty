import React, {Component} from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/Lists/UsersList';
import {NavContext} from '../redux/NavContext';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

const UserIndexScreen = ({users, searchParams, dispatch}) => {
  return (
    <UsersList
      users={users}
      searchElements={searchParams}
      dispatch={dispatch}
      showMore={true}
    />
  );
};

function mapStateToProps(state) {
  return {
    users: state.users,
    searchParams: state.searchParams,
  };
}

export default connect(mapStateToProps)(UserIndexScreen);

UserIndexScreen.propTypes = {
  users: PropTypes.array,
};

const styles = StyleSheet.create({});
