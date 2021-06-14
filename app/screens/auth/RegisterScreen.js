import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import RegisterFormWidget from '../../components/widgets/user/RegisterFormWidget';
import BgContainer from '../../components/containers/BgContainer';
import {useDispatch, useSelector} from 'react-redux';
import validate from 'validate.js';

const RegisterScreen = ({navigation}) => {
  const [userCountryId, setUserCountryId] = useState('');
  const {token} = useSelector(state => state);
  const dispatch = useDispatch();
  const {navigate} = navigation;
  // const [visible, setVisible] = useState(false);
  // const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  // const parent = dangerouslyGetParent();

  useEffect(() => {
    if (!validate.isEmpty(token) && token) {
      dispatch(navigate('SettingIndex'));
    }
  }, [token]);

  return (
    <BgContainer showImage={false}>
      <RegisterFormWidget userCountryId={userCountryId} />
    </BgContainer>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
