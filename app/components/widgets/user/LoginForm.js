import React, {useState, useContext} from 'react';
import {iconSizes, text, height, formWidget} from '../../../constants/sizes';
import {appUrlIos} from './../../../env';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {googleLogin, setRole, submitAuth} from '../../../redux/actions/user';
import {View, Linking, StyleSheet} from 'react-native';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from './../ImageLoaderContainer';
import {first, filter, isEmpty} from 'lodash';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import {APP_CASE} from '../../../../app.json';
import widgetStyles from './../widgetStyles';

const LoginForm = ({showBtns = false}) => {
  const {roles} = useSelector(state => state);
  const {logo, colors} = useContext(GlobalValuesContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [visiblePassword, setVisiblePassword] = useState(true);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  // GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //   webClientId: LOGIN_AUTH_KEY(), // client ID of type WEB for your server (needed to verify user ID and offline access)
  //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   hostedDomain: links.apiUrl, // specifies a hosted domain restriction
  //   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  //   forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  //   accountName: APP_CASE, // [Android] specifies an account name on the device that should be used
  //   //iosClientId:
  //   //'166842560446-to76ga276m1dihshq8tl92bfbttj1i5h.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // });

  const handleRegisterClick = () => {
    if (!isEmpty(roles)) {
      dispatch(setRole(first(filter(roles, r => r.name === 'Client'))));
    }
    return navigate('Register');
  };

  return (
    <KeyBoardContainer>
      <View
        style={{
          width: '95%',
          paddingTop: '10%',
          alignSelf: 'center',
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageLoaderContainer
          img={logo}
          style={{width: 100, height: 100, margin: 20}}
          resizeMode="contain"
        />
        <Input
          placeholder={I18n.t('email')}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('email')}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
          leftIcon={() => (
            <Icon
              name="envelope"
              type="evilicon"
              size={iconSizes.smaller}
              onPress={() => setVisiblePassword(!visiblePassword)}
            />
          )}
        />
        <Input
          rightIcon={() => (
            <Icon
              name="eye"
              type="font-awesome"
              size={iconSizes.smallest}
              onPress={() => setVisiblePassword(!visiblePassword)}
            />
          )}
          leftIcon={() => (
            <Icon
              name="lock"
              type="evilicon"
              size={iconSizes.smaller}
              onPress={() => setVisiblePassword(!visiblePassword)}
            />
          )}
          placeholder={I18n.t('password')}
          secureTextEntry={visiblePassword}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('password')}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
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
            fontWeight: text.bold,
          }}
          onPress={() => dispatch(submitAuth({email, password}))}
        />
        {showBtns && (
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
              fontWeight: text.bold,
            }}
            onPress={() => handleRegisterClick()}
          />
        )}
        {showBtns && (
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
              fontWeight: text.bold,
            }}
            onPress={() => Linking.openURL(`${appUrlIos}password/reset`)}
          />
        )}
        {/*<SocialIcon*/}
        {/*  title={I18n.t('sign_with_google')}*/}
        {/*  button*/}
        {/*  type="google-plus-official"*/}
        {/*  fontStyle={{fontFamily: text.font, fontSize: text.medium}}*/}
        {/*  style={{width: '100%', height: 50, borderRadius: 0}}*/}
        {/*  onPress={() => dispatch(googleLogin())}*/}
        {/*/>*/}
      </View>
    </KeyBoardContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
