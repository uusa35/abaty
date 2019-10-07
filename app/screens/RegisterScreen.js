import React, {useState} from 'react';
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
    <View style={styles.iconContainer}>
      <Icon
        name="close"
        size={25}
        style={{
          position: 'absolute',
          top: 100,
          left: 100,
          borderWidth: 10,
          zIndex: 99
        }}
        hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
        onPress={() => {
          setVisible(false);
          return parent.state.index ? goBack() : navigate('Home');
        }}
      />

      <RegisterFormWidget userCountryId={userCountryId} player_id={playerId} />
    </View>
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
