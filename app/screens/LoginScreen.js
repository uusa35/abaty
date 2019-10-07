import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LoginForm from '../components/widgets/LoginForm';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import {hideLoginModal} from '../redux/actions';

const LoginScreen = () => {
  const [visible, setVisible] = useState(false);
  const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  const parent = dangerouslyGetParent();
  console.log('dengirious', parent.state.index);

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
      <LoginForm showBtns={true} />
    </Fragment>
  );
};

export default LoginScreen;

LoginScreen.propTypes = {
  token: PropTypes.string
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
