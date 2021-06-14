import {Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {iconSizes, text} from '../../../constants/sizes';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import {submitCart} from '../../../redux/actions/cart';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {width} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useNavigation} from '@react-navigation/native';
import validate from 'validate.js';
import widgetStyles from '../widgetStyles';
import DesigneratBtn from '../Button/DesigneratBtn';
import {getWhatsappLink} from '../../../helpers';
import {APP_CASE} from '../../../../app.json';
import {themeColors} from '../../../constants/colors';
import CartPickupFromBranchInformation from './CartPickupFromBranchInformation';

const DesigneratCartForm = ({
  shipment_notes = null,
  editModeDefault = true,
  coupon,
  showLabel = false,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const {auth, address, shipmentCountry, settings, pickup, cart, branch} =
    useSelector(state => state);
  const navigation = useNavigation();
  const [name, setName] = useState(!validate.isEmpty(auth) ? auth.name : null);
  const [email, setEmail] = useState(
    !validate.isEmpty(auth) ? auth.email : null,
  );
  const [mobile, setMobile] = useState(
    !validate.isEmpty(auth) ? auth.mobile : null,
  );
  const [currentAddress, setCurrentAddress] = useState(
    !validate.isEmpty(address) ? address : null,
  );
  const [notes, setNotes] = useState(null);
  const [code, setCode] = useState(
    !validate.isEmpty(coupon) ? coupon.code : '',
  );
  const [editMode, setEditMode] = useState(editModeDefault);
  const [checked, setChecked] = useState(false);
  const [area, setArea] = useState(address ? address.area : null);
  const [block, setBlock] = useState(address ? address.block : null);
  const [street, setStreet] = useState(address ? address.street : null);
  const [building, setBuilding] = useState(address ? address.building : null);

  useMemo(() => {
    setCurrentAddress(address);
    setArea(address.area);
    setBlock(address.block);
    setBuilding(address.building);
    setStreet(address.street);
  }, [address]);

  useEffect(() => {
    const {country_name, area, block, street, building} = address;
    setCurrentAddress(
      `${country_name} - ${area} - B.${block} - St.${street} - Bld.${building}`,
    );
  }, [address]);

  return (
    <View style={{flexDirection: 'column', width, paddingBottom: '10%'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: 'white',
        }}>
        <Text style={widgetStyles.headerThree}>
          {I18n.t('shipment_address')}
        </Text>
        <Text style={widgetStyles.headerThree}>{I18n.t('step')} (2/3)</Text>
      </View>
      {shipment_notes && (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 15,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: 'white',
          }}
          onPress={() => navigation.navigate('Contactus')}>
          <Text style={[widgetStyles.headerThree, {lineHeight: 35}]}>
            {shipment_notes}
          </Text>
        </TouchableOpacity>
      )}

      <CartPickupFromBranchInformation />

      <Text
        style={[
          widgetStyles.headerThree,
          {padding: 20, textAlign: 'left', paddingTop: 25, paddingBottom: 25},
        ]}>
        {I18n.t('confirm_information')}
      </Text>
      <View
        style={[
          widgetStyles.panelContent,
          {
            paddingBottom: 20,
            paddingTop: 20,
            marginTop: 0,
          },
        ]}>
        <Input
          editable={editMode}
          placeholder={name ? name : I18n.t('name')}
          value={name ? name : null}
          leftIcon={() =>
            name ? (
              <Text style={widgetStyles.headerThree}>{I18n.t('name')}</Text>
            ) : null
          }
          leftIconContainerStyle={{paddingRight: 15}}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 0,
              borderRadius: 0,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('email') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: settings.colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
          onChangeText={name => setName(name)}
        />
        <Input
          editable={editMode}
          placeholder={email ? email : I18n.t('email')}
          value={email ? email : null}
          leftIcon={() =>
            email ? (
              <Text style={widgetStyles.headerThree}>{I18n.t('email')}</Text>
            ) : null
          }
          leftIconContainerStyle={{paddingRight: 15}}
          label={showLabel ? I18n.t('email') : null}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 0,
              borderRadius: 0,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          labelStyle={[
            styles.titleLabelStyle,
            {color: settings.colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
        />
        <Input
          editable={editMode}
          value={mobile ? mobile : null}
          textContentType="telephoneNumber"
          leftIcon={() => (
            <Text style={{textAlign: 'left', color: 'black'}}>
              +{shipmentCountry.calling_code}
            </Text>
          )}
          leftIconContainerStyle={{paddingRight: 15, paddingBottom: 4}}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          placeholder={I18n.t('mobile') + '*'}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderRadius: 0,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('mobile') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: settings.colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="number-pad"
          onChangeText={text => setMobile(text)}
        />
        <TouchableOpacity
          // onPress={() => {
          //   editMode ? dispatch(showCountryModal()) : null;
          // }}
          style={{
            borderWidth: 1,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderColor: 'lightgrey',
            height: 50,
            width: width - 60,
            alignSelf: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 15,
          }}>
          <Text style={[widgetStyles.headerThree, {paddingRight: 10}]}>
            {I18n.t('country')}
          </Text>
          <Text style={widgetStyles.headerThree}>{shipmentCountry.slug}</Text>
        </TouchableOpacity>
        {!validate.isEmpty(address) && (
          <>
            <Input
              editable={false}
              placeholder={address.area ? address.area : I18n.t('area')}
              value={address ? address.area : null}
              leftIcon={() =>
                address.area ? (
                  <Text style={widgetStyles.headerThree}>{I18n.t('area')}</Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('area') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: settings.colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={address.block ? address.block : I18n.t('block')}
              value={address ? address.block : null}
              leftIcon={() =>
                address.block ? (
                  <Text style={widgetStyles.headerThree}>
                    {I18n.t('block')}
                  </Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('block') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: settings.colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={address.street ? address.street : I18n.t('street')}
              value={address ? address.street : null}
              leftIcon={() =>
                address.street ? (
                  <Text style={widgetStyles.headerThree}>
                    {I18n.t('street')}
                  </Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('street') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: settings.colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={
                address.building ? address.building : I18n.t('building_no')
              }
              value={address ? address.building : null}
              leftIcon={() =>
                address.building ? (
                  <Text style={widgetStyles.headerThree}>
                    {I18n.t('building_no')}
                  </Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('building') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: settings.colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
          </>
        )}
        <Input
          spellCheck={true}
          editable={editMode}
          placeholder={notes ? notes : I18n.t('additional_information')}
          value={notes ? notes : null}
          containerStyle={{
            marginBottom: 0,
            paddingBottom: 0,
            height: 80,
          }}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 1,
              borderRadius: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderBottomRightRadius: 3,
              borderBottomLeftRadius: 3,
              height: 80,
            },
          ]}
          inputStyle={[widgetStyles.inputStyle, {alignItems: 'center'}]}
          label={showLabel ? I18n.t('additional_information') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: settings.colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
          // multiline={true}
          numberOfLines={3}
          onChangeText={notes => setNotes(notes)}
        />
      </View>

      <View style={[widgetStyles.panelContent, {marginTop: 0}]}>
        <Pressable
          onPress={() => navigation.navigate('UserAddressIndex')}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderTopColor: settings.colors.btn_bg_theme_color,
            borderWidth: 1,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderBottomWidth: 0,
            height: 50,
          }}>
          <Text
            style={[
              widgetStyles.headerThree,
              {
                paddingLeft: 20,
                paddingRight: 20,
                color: settings.colors.header_one_theme_color,
              },
            ]}>
            {I18n.t('change_modify_address')}
          </Text>
          <Icon
            name={`chevron-${isRTL ? 'left' : 'right'}`}
            type="evilicon"
            size={iconSizes.medium}
            color={settings.colors.icon_theme_color}
          />
        </Pressable>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserAddressCreate')}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: settings.colors.btn_bg_theme_color,
            borderBottomColor: settings.colors.btn_bg_theme_color,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            height: 50,
          }}>
          <Text
            style={[
              widgetStyles.headerThree,
              {
                paddingLeft: 20,
                paddingRight: 20,
                color: settings.colors.header_one_theme_color,
              },
            ]}>
            {I18n.t('add_new_address')}
          </Text>
          <Icon
            name={`chevron-${isRTL ? 'left' : 'right'}`}
            type="evilicon"
            size={iconSizes.medium}
            color={settings.colors.icon_theme_color}
          />
        </TouchableOpacity>
      </View>
      <DesigneratBtn
        handleClick={() =>
          dispatch(
            submitCart({
              name,
              email,
              mobile,
              address: currentAddress,
              area,
              block,
              street,
              building,
              country_id: shipmentCountry.id,
              area_id: address.area_id,
              notes,
            }),
          )
        }
        title={I18n.t('confirm')}
        marginTop={20}
      />
    </View>
  );
};

export default DesigneratCartForm;

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
