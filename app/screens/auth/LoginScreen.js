import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import LoginForm from '../../components/widgets/LoginForm';
import BgContainer from '../../components/containers/BgContainer';
import {HOMEKEY} from './../../../app';

const LoginScreen = () => {
  // const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  // const parent = dangerouslyGetParent();

  return (
    <BgContainer showImage={!HOMEKEY}>
      <LoginForm showBtns={true} />
    </BgContainer>
  );
};

export default LoginScreen;

LoginScreen.propTypes = {
  token: PropTypes.string,
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

{
  /*<Icon*/
}
{
  /*  name="close"*/
}
{
  /*  size={25}*/
}
{
  /*  containerStyle={{*/
}
{
  /*    zIndex: 99,*/
}
{
  /*    position: 'absolute',*/
}
{
  /*    top: 50,*/
}
{
  /*    left: 50*/
}
{
  /*  }}*/
}
{
  /*  hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}*/
}
{
  /*  onPress={() => {*/
}
{
  /*    setVisible(false);*/
}
{
  /*    return parent.state.index && parent.state.index > 0*/
}
{
  /*      ? goBack()*/
}
{
  /*      : navigate('Home');*/
}
{
  /*  }}*/
}
{
  /*/>*/
}
