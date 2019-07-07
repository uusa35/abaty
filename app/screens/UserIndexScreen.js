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
    const {users, navigation} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <UsersList elements={users} />
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(UserIndexScreen);

UserIndexScreen.propTypes = {
  users: PropTypes.array
};

const styles = StyleSheet.create({});
