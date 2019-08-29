import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
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
    auth: state.auth,
    token: state.token,
    logo: state.settings.logo,
    colors: state.settings.colors,
    country: state.country,
    playerId: state.playerId
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
