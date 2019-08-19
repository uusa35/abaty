import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, isIOS} from '../constants';
import UserEditFormWidget from '../components/widgets/user/UserEditFormWidget';
import {
  authSelector,
  colorsSelector,
  countrySelector,
  logoSelector,
  playerIdSelector,
  tokenSelector
} from '../redux/selectors/collection';

const UserEditScreen = ({
  logo,
  auth,
  playerId,
  token,
  country,
  colors,
  dispatch
}) => {
  return (
    <UserEditFormWidget
      auth={auth}
      token={token}
      player_id={playerId}
      logo={logo}
      colors={colors}
      country={country}
      dispatch={dispatch}
    />
  );
};

function mapStateToProps(state) {
  return {
    auth: authSelector(state),
    token: tokenSelector(state),
    logo: logoSelector(state),
    colors: colorsSelector(state),
    country: countrySelector(state),
    playerId: playerIdSelector(state)
  };
}

export default connect(mapStateToProps)(UserEditScreen);

UserEditScreen.propTypes = {
  logo: PropTypes.string,
  token: PropTypes.string,
  country: PropTypes.object,
  playerId: PropTypes.string,
  auth: PropTypes.object
};

const styles = StyleSheet.create({});
