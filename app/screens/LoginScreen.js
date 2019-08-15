import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Linking} from 'react-native';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text} from '../constants';
import {submitAuth} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import {appUrlIos} from './../env';
import {colorsSelector, logoSelector} from '../redux/selectors/collection';
import {useNavigation} from 'react-navigation-hooks';
import {DispatchContext} from '../redux/DispatchContext';
import LoginForm from '../components/widgets/LoginForm';

const LoginScreen = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <LoginForm showBtns={true} />
    </View>
  );
};

export default React.memo(LoginScreen);

LoginScreen.propTypes = {
  token: PropTypes.string
};

const styles = StyleSheet.create({});
