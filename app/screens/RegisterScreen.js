import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import RegisterFormWidget from '../components/widgets/user/RegisterFormWidget';
import {playerIdSelector, tokenSelector} from '../redux/selectors/collection';

const RegisterScreen = ({playerId}) => {
  const [userCountryId, setUserCountryId] = useState('');
  return (
    <RegisterFormWidget userCountryId={userCountryId} player_id={playerId} />
  );
};

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    playerId: playerIdSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(RegisterScreen));

RegisterScreen.propTypes = {
  playerId: PropTypes.string
};

const styles = StyleSheet.create({});
