import React, {useState, useContext} from 'react';
import FastImage from 'react-native-fast-image';
import {images, text, width} from '../../constants';
import {appUrlIos} from './../../env';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {submitAuth} from '../../redux/actions';
import {View, Linking} from 'react-native';
import {DispatchContext} from '../../redux/DispatchContext';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from 'react-navigation-hooks';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const {dispatch} = useContext(DispatchContext);
  const {logo, colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  return (
    <KeyboardAwareScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        width: width - 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <View style={{width: '100%', marginTop: 0, alignItems: 'center'}}>
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
          containerStyle={{marginBottom: 50, width: '100%'}}
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
    </KeyboardAwareScrollView>
  );
};

export default React.memo(LoginForm);
