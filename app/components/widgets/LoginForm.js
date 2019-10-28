import React, {useState, useContext} from 'react';
import FastImage from 'react-native-fast-image';
import {images, text, width} from '../../constants';
import {appUrlIos} from './../../env';
import {Button, Input, SocialIcon} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {googleLogin, submitAuth} from '../../redux/actions';
import {View, Linking} from 'react-native';
import {DispatchContext} from '../../redux/DispatchContext';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from 'react-navigation-hooks';
import {GoogleSignin} from 'react-native-google-signin';

const LoginForm = ({showBtns = false}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const {dispatch} = useContext(DispatchContext);
  const {logo, colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '138610078320-tiktp898sbsjsjgossmpv093d6i9k60h.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: 'http://abati.ideasowners.net', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId:
      '138610078320-tiktp898sbsjsjgossmpv093d6i9k60h.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  return (
    <KeyboardAwareScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
            marginBottom: 20,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
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
            marginBottom: 20,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          shake={true}
          keyboardType="default"
          onChangeText={password => setPassword(password)}
        />
        <Button
          raised
          containerStyle={{marginBottom: 10, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0,
          }}
          title={I18n.t('login')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
          onPress={() => dispatch(submitAuth({email, password}))}
        />
        {showBtns ? (
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('new_user')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() => navigate('Register')}
          />
        ) : null}
        {showBtns ? (
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('forget_password')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() => Linking.openURL(`${appUrlIos}/password/reset`)}
          />
        ) : null}
        <SocialIcon
          title={I18n.t('sign_with_google')}
          button
          type="google-plus-official"
          fontStyle={{fontFamily: text.font, fontSize: text.medium}}
          style={{width: '100%', height: 50, borderRadius: 0}}
          onPress={() => dispatch(googleLogin())}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginForm;
