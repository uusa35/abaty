import React, {useState, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {bottomContentInset, text, height} from '../../../constants/sizes';
import {showCountryModal} from '../../../redux/actions';
import {register} from '../../../redux/actions/user';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ABATI} from './../../../../app';
import {useDispatch, useSelector} from 'react-redux';
import {filter, first} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';

const RegisterFormWidget = () => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {country, playerId, role, roles} = useSelector((state) => state);
  const dispatch = useDispatch();
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
      contentInset={{bottom: bottomContentInset}}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: height,
        alignSelf: 'center',
      }}>
      <ImageLoaderContainer
        img={logo}
        style={{width: 50, height: 50, marginTop: 10, marginBottom: '5%'}}
        resizeMode="contain"
      />
      <Input
        placeholder={I18n.t('name') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        label={I18n.t('name')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        shake={true}
        keyboardType="default"
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder={I18n.t('password')}
        secureTextEntry={true}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        label={I18n.t('password')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="default"
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder={I18n.t('email') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        label={I18n.t('email')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        leftIcon={() => <Text>+{country.calling_code}</Text>}
        leftIconContainerStyle={{paddingRight: 15}}
        placeholder={I18n.t('mobile') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        label={I18n.t('mobile')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="number-pad"
        onChangeText={(text) => setMobile(text)}
      />
      <View style={{width: '100%'}}>
        <Text
          style={[
            styles.titleLabelStyle,
            {
              color: colors.main_theme_color,
              paddingBottom: 10,
              paddingLeft: 20,
            },
          ]}>
          {I18n.t('country')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(showCountryModal());
          }}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
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
      </View>
      <Input
        placeholder={I18n.t('address')}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          height: 80,
        }}
        inputStyle={{
          fontFamily: text.font,
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        }}
        numberOfLines={3}
        shake={true}
        label={I18n.t('address')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        keyboardType="default"
        onChangeText={(text) => setAddress(text)}
      />
      {!ABATI ? (
        <Input
          placeholder={I18n.t('description')}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
            paddingLeft: 15,
            paddingRight: 15,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            fontSize: 14,
            textAlign: isRTL ? 'right' : 'left',
          }}
          numberOfLines={3}
          shake={true}
          label={I18n.t('description')}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          keyboardType="default"
          onChangeText={(text) => setDescription(text)}
        />
      ) : null}

      <Button
        raised
        containerStyle={{marginBottom: 10, width: '90%', alignSelf: 'center'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        title={I18n.t('register')}
        titleStyle={[
          styles.titleLabelStyle,
          {color: colors.btn_text_theme_color},
        ]}
        onPress={() =>
          dispatch(
            register({
              name,
              email,
              password,
              mobile,
              country_id: country.id,
              address,
              player_id: playerId,
              description,
              role_id: role
                ? role.id
                : first(filter(roles, (r) => r.name === 'Client')).id,
            }),
          )
        }
      />
    </KeyboardAwareScrollView>
  );
};

export default React.memo(RegisterFormWidget);

RegisterFormWidget.propTypes = {};

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
