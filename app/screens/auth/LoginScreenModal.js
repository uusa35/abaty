import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';
import {hideLoginModal} from '../../redux/actions';
import LoginForm from '../../components/widgets/user/LoginForm';
import {useDispatch} from 'react-redux';

const LoginScreenModal = ({loginModal}) => {
  const dispatch = useDispatch();

  return (
    <View style={{backgroundColor: 'white'}}>
      <Modal transparent={false} visible={loginModal} animationType={'slide'}>
        <View style={styles.iconContainer}>
          <Icon
            name="close"
            size={25}
            hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
            onPress={() => dispatch(hideLoginModal())}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreenModal;

LoginScreenModal.propTypes = {
  token: PropTypes.string,
  logo: PropTypes.string,
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  formContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
});
