import React, {Fragment, useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import UserEditFormWidget from '../../components/widgets/user/UserEditFormWidget';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import {DispatchContext} from '../../redux/DispatchContext';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const UserEditScreen = ({auth, playerId, country}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors, token, logo} = useContext(GlobalValuesContext);
  const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  const parent = dangerouslyGetParent();
  return (
    <Fragment>
      <Icon
        name="close"
        size={25}
        containerStyle={{
          zIndex: 99,
          position: 'absolute',
          top: 50,
          left: 50,
        }}
        hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
        onPress={() => {
          setVisible(false);
          return parent.state.index && parent.state.index > 0
            ? goBack()
            : navigate('Home');
        }}
      />
      <UserEditFormWidget
        auth={auth}
        token={token}
        player_id={playerId}
        logo={logo}
        colors={colors}
        country={country}
        dispatch={dispatch}
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
