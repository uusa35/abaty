import React, {useState, useContext} from 'react';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {text} from '../../../constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {register, showCountryModal, updateUser} from '../../../redux/actions';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {DispatchContext} from '../../../redux/DispatchContext';
import {NavContext} from '../../../redux/NavContext';
import validate from 'validate.js';

const UserEditFormWidget = ({auth, player_id, api_token}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors, total, country} = useContext(GlobalValuesContext);
  const {navigation} = useContext(NavContext);
  const [name, setName] = useState(!validate.isEmpty(auth) ? auth.name : null);
  const [email, setEmail] = useState(
    !validate.isEmpty(auth) ? auth.email : null
  );
  const [mobile, setMobile] = useState(
    !validate.isEmpty(auth) ? auth.mobile : null
  );
  const [address, setAddress] = useState(
    !validate.isEmpty(auth) ? auth.email : null
  );
  const [notes, setNotes] = useState(
    !validate.isEmpty(auth) ? auth.description : null
  );
  console.log('the auth', auth);
  return (
    <View style={{flexDirection: 'column', width: '100%'}}>
      <Input
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
        placeholder={name ? name : I18n.t('name')}
      />
      <Input
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
        placeholder={email ? email : I18n.t('email')}
      />
      <Input
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
        placeholder={mobile ? mobile : I18n.t('mobile')}
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
        placeholder={address ? address : I18n.t('full_address')}
      />
      <Button
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0
        }}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
        }}
        title={I18n.t('update_information')}
        onPress={() =>
          dispatch(
            updateUser({
              id: auth.id,
              api_token,
              name,
              email,
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

export default React.memo(UserEditFormWidget);

UserEditFormWidget.propTypes = {};

const styles = StyleSheet.create({});
