import React, {useState, useContext} from 'react';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {images, text} from '../../../constants';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {showCountryModal} from '../../../redux/actions';
import {register} from '../../../redux/actions/user';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {DispatchContext} from '../../../redux/DispatchContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

const RegisterFormWidget = ({player_id}) => {
  const {colors, country, logo} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  return (
    <KeyboardAwareScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 180}}
      contentContainerStyle={{
        flex: 1,
        width: '100%',
        padding: 15,
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
        placeholder={I18n.t('name') + '*'}
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
        onChangeText={text => setName(text)}
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
        onChangeText={text => setPassword(text)}
      />
      <Input
        placeholder={I18n.t('email') + '*'}
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
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder={I18n.t('mobile') + '*'}
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
        keyboardType="number-pad"
        onChangeText={text => setMobile(text)}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(showCountryModal());
        }}
        style={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 10,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
          height: 45,
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.large,
            textAlign: isRTL ? 'right' : 'left',
            color: colors.main_theme_color,
          }}>
          {country.slug}
        </Text>
      </TouchableOpacity>
      <Input
        placeholder={I18n.t('full_address') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 10,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
          height: 80,
        }}
        inputStyle={{
          fontFamily: text.font,
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        }}
        numberOfLines={3}
        shake={true}
        keyboardType="default"
        onChangeText={text => setAddress(text)}
      />
      <Input
        placeholder={I18n.t('description') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 10,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
          height: 80,
        }}
        inputStyle={{
          fontFamily: text.font,
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        }}
        numberOfLines={3}
        shake={true}
        keyboardType="default"
        onChangeText={text => setDescription(text)}
      />
      <Button
        raised
        containerStyle={{marginBottom: 10, width: '90%', alignSelf: 'center'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        title={I18n.t('register')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
        onPress={() =>
          dispatch(
            register({
              name,
              email,
              password,
              mobile,
              country_id: country.id,
              address,
              player_id,
              description,
            }),
          )
        }
      />
    </KeyboardAwareScrollView>
  );
};

export default React.memo(RegisterFormWidget);

RegisterFormWidget.propTypes = {};

const styles = StyleSheet.create({});
