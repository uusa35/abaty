import React, {useState, useContext, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';
import {hideLoginModal} from '../redux/actions';
import {DispatchContext} from '../redux/DispatchContext';
import LoginForm from '../components/widgets/LoginForm';

const LoginScreenModal = ({loginModal}) => {
  const {dispatch} = useContext(DispatchContext);
  const [visible, setVisible] = useState(loginModal);
  useMemo(() => {
    if (!visible) {
      return dispatch(hideLoginModal());
    }
  }, [visible]);
  return (
    <Modal
      transparent={false}
      visible={loginModal}
      animationType={'slide'}
      onRequestClose={() => setVisible(false)}>
      <View
        style={{
          flex: 0.1,
          padding: 10,
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
        <Icon
          name="close"
          size={25}
          onPress={() => dispatch(hideLoginModal())}
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        />
      </View>
      <View
        style={{
          flex: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -50
        }}>
        <LoginForm />
      </View>
    </Modal>
  );
};

export default React.memo(LoginScreenModal);

LoginScreenModal.propTypes = {
  token: PropTypes.string,
  colors: PropTypes.object,
  logo: PropTypes.string
};

const styles = StyleSheet.create({});
