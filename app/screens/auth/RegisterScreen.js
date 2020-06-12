import React, {useState} from 'react';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import RegisterFormWidget from '../../components/widgets/user/RegisterFormWidget';
import {
  playerIdSelector,
  tokenSelector,
} from '../../redux/selectors/collection';
import BgContainer from '../../components/containers/BgContainer';

const RegisterScreen = () => {
  const [userCountryId, setUserCountryId] = useState('');
  // const [visible, setVisible] = useState(false);
  // const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  // const parent = dangerouslyGetParent();
  return (
    <BgContainer showImage={false}>
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
      <RegisterFormWidget userCountryId={userCountryId} />
    </BgContainer>
  );
};

export default React.memo(RegisterScreen);
const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
