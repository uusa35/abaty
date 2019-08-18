import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import LoginForm from '../components/widgets/LoginForm';

const LoginScreen = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <LoginForm showBtns={true} />
    </View>
  );
};

export default LoginScreen;

LoginScreen.propTypes = {
  token: PropTypes.string
};

const styles = StyleSheet.create({});
