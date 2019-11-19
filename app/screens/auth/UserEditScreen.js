import React, {Fragment, useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import UserEditFormWidget from '../../components/widgets/user/UserEditFormWidget';
import {DispatchContext} from '../../redux/DispatchContext';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const UserEditScreen = ({auth, playerId, country}) => {
  const {token, logo} = useContext(GlobalValuesContext);
  return (
    <Fragment>
      <UserEditFormWidget
        showIcon={false}
        auth={auth}
        token={token}
        player_id={playerId}
        logo={logo}
        country={country}
      />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    country: state.country,
    playerId: state.playerId,
  };
}

export default connect(mapStateToProps)(UserEditScreen);

UserEditScreen.propTypes = {
  country: PropTypes.object,
  playerId: PropTypes.string,
  auth: PropTypes.object,
};

const styles = StyleSheet.create({});
