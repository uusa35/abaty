import React from 'react';
import {StyleSheet} from 'react-native';
import UserEditFormWidget from '../../components/widgets/user/UserEditFormWidget';

const UserEditScreen = () => {
  return <UserEditFormWidget showIcon={false} />;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    country: state.country,
    playerId: state.playerId,
  };
}

export default UserEditScreen;

const styles = StyleSheet.create({});
