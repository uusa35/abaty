import React, {useState, useContext} from 'react';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {text} from '../../../constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {register, showCountryModal} from '../../../redux/actions';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {DispatchContext} from '../../../redux/DispatchContext';

const RegisterFormWidget = ({userCountryId, player_id}) => {
  const {colors, country} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const [name, setName] = useState('user name');
  const [email, setEmail] = useState('test123243244@test.com');
  const [mobile, setMobile] = useState('234324234');
  const [address, setAddress] = useState(
    'klsd lsdkjf lsdj flkdsj flkdsj flkdsjf lkdsjf'
  );
  const [password, setPassword] = useState('secret');
  const [notes, setNotes] = useState('');
  return (
    <View style={{flexDirection: 'column', width: '100%'}}>
      <Input
        placeholder={I18n.t('name') + '*'}
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
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder={I18n.t('email') + '*'}
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
          marginBottom: 20
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left'
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
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.large,
            textAlign: isRTL ? 'right' : 'left',
            color: colors.main_theme_color
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
          height: 80
        }}
        inputStyle={{
          fontFamily: text.font,
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left'
        }}
        numberOfLines={3}
        shake={true}
        keyboardType="default"
        onChangeText={text => setAddress(text)}
      />
      <Button
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0
        }}
        title={I18n.t('register')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
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
              player_id
            })
          )
        }
      />
    </View>
  );
};

export default React.memo(RegisterFormWidget);

RegisterFormWidget.propTypes = {};

const styles = StyleSheet.create({});
