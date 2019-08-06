import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Linking} from 'react-native';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text} from '../constants';
import {submitAuth} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import {appUrlIos} from './../env';
import {colorsSelector, logoSelector} from '../redux/selectors/collection';
import {useNavigation} from 'react-navigation-hooks';
import {DispatchContext} from '../redux/DispatchContext';

const LoginScreen = ({colors, logo}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const {navigate} = useNavigation();
  const {dispatch} = useContext(DispatchContext);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
        <FastImage
          source={{uri: logo}}
          style={{width: 100, height: 100, margin: 20}}
          resizeMode="contain"
          loadingIndicatorSource={images.logo}
        />
        <Input
          placeholder={I18n.t('email')}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left'
          }}
          shake={true}
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
        />
        <Input
          placeholder={I18n.t('password')}
          secureTextEntry={true}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left'
          }}
          shake={true}
          keyboardType="default"
          onChangeText={password => setPassword(password)}
        />
        <Button
          raised
          containerStyle={{marginBottom: 50, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0
          }}
          title={I18n.t('login')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
          onPress={() => dispatch(submitAuth({email, password}))}
        />
        <Button
          raised
          containerStyle={{marginBottom: 10, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0
          }}
          title={I18n.t('new_user')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
          onPress={() => navigate('Register')}
        />
        <Button
          raised
          containerStyle={{marginBottom: 10, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0
          }}
          title={I18n.t('forget_password')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
          onPress={() => Linking.openURL(`${appUrlIos}/password/reset`)}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    colors: colorsSelector(state),
    logo: logoSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(LoginScreen));

LoginScreen.propTypes = {
  token: PropTypes.string,
  colors: PropTypes.object,
  logo: PropTypes.string
};

const styles = StyleSheet.create({});
