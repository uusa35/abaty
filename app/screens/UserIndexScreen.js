import React, {Component} from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/Lists/UsersList';
import {NavContext} from '../redux/NavContext';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

class UserIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {users, searchParams} = this.props;
    return <UsersList elements={users} searchParams={searchParams} />;
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(UserIndexScreen);

UserIndexScreen.propTypes = {
  users: PropTypes.array
};

const styles = StyleSheet.create({});
