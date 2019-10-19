import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import LoginForm from '../../components/widgets/LoginForm';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';

const LoginScreen = () => {
  const [visible, setVisible] = useState(false);
  const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  const parent = dangerouslyGetParent();

  return (
    <Fragment>
      {/*<Icon*/}
      {/*  name="close"*/}
      {/*  size={25}*/}
      {/*  containerStyle={{*/}
      {/*    zIndex: 99,*/}
      {/*    position: 'absolute',*/}
      {/*    top: 50,*/}
      {/*    left: 50*/}
      {/*  }}*/}
      {/*  hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}*/}
      {/*  onPress={() => {*/}
      {/*    setVisible(false);*/}
      {/*    return parent.state.index && parent.state.index > 0*/}
      {/*      ? goBack()*/}
      {/*      : navigate('Home');*/}
      {/*  }}*/}
      {/*/>*/}
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
