import React, {useContext, useState, useEffect, Fragment, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {iconSizes, text} from '../../../constants/sizes';
import {enableErrorMessage, showCountryModal} from '../../../redux/actions';
import {clearCart, getCoupon, submitCart} from '../../../redux/actions/cart';
import {Button, Input, CheckBox, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, round, isNull, first, filter} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
} from '../../../redux/actions/types';
import {getConvertedFinalPrice} from '../../../helpers';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import widgetStyles from '../widgetStyles';
import {themeColors} from '../../../constants/colors';
import DesingeratBtn from '../Button/DesigneratBtn';
import {register} from '../../../redux/actions/user';
import {width} from '../../../constants';

const CartList = ({
  shipmentCountry,
  shipment_notes = null,
  editModeDefault = true,
  coupon,
  selectedArea,
  shipmentFees,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors, total, grossTotal, exchange_rate, currency_symbol} =
    useContext(GlobalValuesContext);
  const {cart, auth, guest, country, settings, roles, role, playerId} =
    useSelector(state => state);
  const {navigate} = useNavigation();
  const [name, setName] = useState(!validate.isEmpty(auth) ? auth.name : null);
  const [email, setEmail] = useState(
    !validate.isEmpty(auth) ? auth.email : null,
  );
  const [mobile, setMobile] = useState(
    !validate.isEmpty(auth) ? auth.mobile : null,
  );
  const [address, setAddress] = useState(
    !validate.isEmpty(auth) ? auth.email : null,
  );
  const [notes, setNotes] = useState(
    !validate.isEmpty(auth) ? auth.description : null,
  );
  const [code, setCode] = useState(
    !validate.isEmpty(coupon) ? coupon.code : '',
  );
  const [editMode, setEditMode] = useState(editModeDefault);
  const [checked, setChecked] = useState(false);
  const [area, setArea] = useState('');

  useEffect(() => {
    setEmail(auth.email);
    setName(auth.name);
    setMobile(auth.mobile);
    setAddress(auth.address);
    setNotes(auth.description);
  }, [auth]);

  const handleRegister = () => {
    dispatch(
      register({
        name,
        email,
        password: mobile,
        mobile,
        country_id: country.id,
        address,
        player_id: playerId,
        description: name,
        is_male: true,
        role_id: role ? role.id : first(filter(roles, r => r.isClient)).id,
      }),
    );
  };

  return (
    <Fragment>
      <View
        animation="bounceInLeft"
        easing="ease-out"
        useNativeDriver={true}
        style={{flexDirection: 'column', width: '100%'}}>
        {map(cart, (item, i) => {
          return (
            <ProductItem
              item={item}
              timeData={item.type === 'service' ? item.timeData : null}
              key={item.element.id}
              editMode={editMode}
              qty={item.qty}
              notes={item.notes}
            />
          );
        })}
        <View>
          <View style={{paddingTop: 20, width: width - 20}}>
            <Input
              editable={editMode}
              placeholder={name ? name : I18n.t('name')}
              value={name ? name : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('name')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="default"
              onChangeText={name => setName(name)}
            />
            <Input
              editable={editMode}
              placeholder={email ? email : I18n.t('email')}
              value={email ? email : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('email')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
            />
            <Input
              editable={editMode}
              textContentType="telephoneNumber"
              placeholder={mobile ? mobile : I18n.t('mobile')}
              leftIcon={() => <Text>+{country.calling_code}</Text>}
              leftIconContainerStyle={{paddingRight: 15}}
              value={mobile ? mobile : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('mobile')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="number-pad"
              onChangeText={text => setMobile(text)}
            />
            <TouchableOpacity
              onPress={() => {
                editMode ? dispatch(showCountryModal()) : null;
              }}
              style={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.small,
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
                {shipmentCountry.slug}
              </Text>
            </TouchableOpacity>
            {/*<Input*/}
            {/*  editable={editMode}*/}
            {/*  placeholder={area ? area : I18n.t('area')}*/}
            {/*  value={area ? area : null}*/}
            {/*  inputContainerStyle={{*/}
            {/*    borderWidth: 1,*/}
            {/*    borderColor: 'lightgrey',*/}
            {/*    paddingLeft: 15,*/}
            {/*    paddingRight: 15,*/}
            {/*    marginBottom: iconSizes.tiny,*/}
            {/*  }}*/}
            {/*  inputStyle={{*/}
            {/*    fontFamily: text.font,*/}
            {/*    textAlign: isRTL ? 'right' : 'left',*/}
            {/*  }}*/}
            {/*  label={I18n.t('area')}*/}
            {/*  labelStyle={{*/}
            {/*    paddingBottom: 10,*/}

            {/*    fontFamily: text.font,*/}
            {/*    textAlign: 'left',*/}
            {/*  }}*/}
            {/*  shake={true}*/}
            {/*  keyboardType="default"*/}
            {/*  onChangeText={area => setArea(area)}*/}
            {/*/>*/}
            <Input
              editable={editMode}
              placeholder={address ? address : I18n.t('full_address')}
              value={address ? address : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
                height: 80,
              }}
              inputStyle={{
                fontFamily: text.font,
                fontSize: 14,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('address')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              numberOfLines={3}
              shake={true}
              keyboardType="default"
              onChangeText={address => setAddress(address)}
            />
            {/*<Input*/}
            {/*  spellCheck={true}*/}
            {/*  editable={editMode}*/}
            {/*  placeholder={notes ? notes : I18n.t('additional_information')}*/}
            {/*  value={notes ? notes : null}*/}
            {/*  inputContainerStyle={{*/}
            {/*    borderWidth: 1,*/}
            {/*    borderColor: 'lightgrey',*/}
            {/*    paddingLeft: 15,*/}
            {/*    paddingRight: 15,*/}
            {/*    marginBottom: iconSizes.tiny,*/}
            {/*    height: 80,*/}
            {/*  }}*/}
            {/*  inputStyle={{*/}
            {/*    fontFamily: text.font,*/}
            {/*    textAlign: isRTL ? 'right' : 'left',*/}
            {/*  }}*/}
            {/*  label={I18n.t('additional_information')}*/}
            {/*  labelStyle={{*/}
            {/*    paddingBottom: 10,*/}

            {/*    fontFamily: text.font,*/}
            {/*    textAlign: 'left',*/}
            {/*  }}*/}
            {/*  shake={true}*/}
            {/*  keyboardType="default"*/}
            {/*  multiline={true}*/}
            {/*  numberOfLines={3}*/}
            {/*  onChangeText={notes => setNotes(notes)}*/}
            {/*/>*/}
          </View>
          <DesingeratBtn
            // disabled={!checked}
            handleClick={() => handleRegister()}
            title={I18n.t('confirm_information')}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default CartList;

CartList.propTypes = {
  coupon: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  shipment_notes: PropTypes.string,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({});
