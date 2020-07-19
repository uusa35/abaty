import React from 'react';
import {StyleSheet} from 'react-native';
import UserEditFormWidget from '../../components/widgets/user/UserEditFormWidget';
import BgContainer from '../../components/containers/BgContainer';

const UserEditScreen = () => {
  return (
    <BgContainer>
      <UserEditFormWidget showIcon={false} />
    </BgContainer>
  );
};

export default UserEditScreen;

const styles = StyleSheet.create({});
