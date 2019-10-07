import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import RegisterFormWidget from '../components/widgets/user/RegisterFormWidget';
import {playerIdSelector, tokenSelector} from '../redux/selectors/collection';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';

const RegisterScreen = ({playerId}) => {
  const [userCountryId, setUserCountryId] = useState('');
  const [visible, setVisible] = useState(false);
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
          left: 50
        }}
        hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
        onPress={() => {
          setVisible(false);
          return parent.state.index && parent.state.index > 0
            ? goBack()
            : navigate('Home');
        }}
      />
      <RegisterFormWidget userCountryId={userCountryId} player_id={playerId} />
    </Fragment>
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

const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});
