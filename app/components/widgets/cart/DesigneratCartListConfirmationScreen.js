import React, {useContext, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Pressable,
  Button,
} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS, width} from '../../../constants';
import {text, iconSizes} from '../../../constants/sizes';
import {clearCart, storeOrderCashOnDelivery} from '../../../redux/actions/cart';
import {CheckBox, Icon, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import widgetStyles from '../widgetStyles';
import {adjustColor, getWhatsappLink} from '../../../helpers';
import {
  CREATE_IBOOKEY_PAYMENT_URL,
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
} from '../../../redux/actions/types';
import DesigneratBtn from '../Button/DesigneratBtn';
import DesigneratCartPriceSummary from './DesigneratCartPriceSummary';
import DesingeratBtn from '../Button/DesigneratBtn';
import {APP_CASE} from '../../../../app.json';
import CartPickupFromBranchInformation from './CartPickupFromBranchInformation';
import {themeColors} from '../../../constants/colors';
import FastImage from 'react-native-fast-image';
import {images} from '../../../constants/images';
import Modal from 'react-native-modal';

const DesigneratCartListConfirmationScreen = ({
  showLabel = false,
  editMode = false,
}) => {
  const dispatch = useDispatch();
  const {colors, total, grossTotal} = useContext(GlobalValuesContext);
  const {
    coupon,
    shipmentFees,
    cart,
    settings,
    shipmentCountry,
    pickup,
    branch,
  } = useSelector(state => state);

  const navigation = useNavigation();
  const route = useRoute();
  const {
    cName,
    cEmail,
    cMobile,
    cAddress,
    cNotes,
    cArea,
    cBlock,
    cStreet,
    cBuilding,
    cAreaId,
    country_id,
    area_id,
  } = route.params;
  const [checked, setChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCashOnDelivery = () => {
    setIsVisible(false);
    return dispatch(
      storeOrderCashOnDelivery({
        name: cName,
        email: cEmail,
        mobile: cMobile,
        address: cAddress,
        block: cBlock,
        building: cBuilding,
        street: cStreet,
        area: cArea,
        area_id: cAreaId,
        country_id,
        cart,
        price: total,
        net_price: grossTotal,
        shipment_fees: shipmentFees,
        cash_on_delivery: settings.cash_on_delivery,
        receive_on_branch: pickup,
        branch_id: branch ? branch.id : null,
        coupon_id: !isEmpty(coupon) ? coupon.id : null,
        discount: !isEmpty(coupon) ? coupon.value : 0,
        notes: cNotes,
        payment_method: isIOS
          ? 'Iphone - CASH ON DELIVERY'
          : 'Android - CASH ON DELIVERY',
      }),
    );
  };

  return (
    <View style={{flexDirection: 'column', width, paddingBottom: '10%'}}>
      <Modal isVisible={isVisible} transparent={true}>
        <View
          style={{
            height: '30%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'exclamation'}
              type="evilicon"
              style={{paddingLeft: 10, paddingRight: 10}}
            />
            <Text style={widgetStyles.headerFour}>
              {I18n.t('order_confirmation')}
            </Text>
          </View>
          <View style={[widgetStyles.panelContent, {marginBottom: 10}]}>
            <Text style={[widgetStyles.headerThree, {lineHeight: 30}]}>
              {I18n.t('order_cash_on_delivery_confirmation')}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <DesigneratBtn
              handleClick={() => handleCashOnDelivery()}
              title={I18n.t('confirm')}
              width={'30%'}
            />
            <DesigneratBtn
              handleClick={() => setIsVisible(false)}
              title={I18n.t('cancel')}
              width={'30%'}
            />
          </View>
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: 'white',
        }}>
        <Text style={widgetStyles.headerThree}>
          {I18n.t('go_to_payment_page')}
        </Text>
        <Text style={widgetStyles.headerThree}>{I18n.t('step')} (3/3)</Text>
      </View>
      {settings.shipment_notes && (
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
            {settings.shipment_notes}
          </Text>
        </TouchableOpacity>
      )}

      {pickup && <CartPickupFromBranchInformation />}
      <DesigneratCartPriceSummary
        title={I18n.t('order_summary')}
        grossTotal={grossTotal}
        shipmentFees={shipmentFees}
      />
      {!pickup && (
        <Text
          style={[widgetStyles.headerThree, {textAlign: 'left', padding: 20}]}>
          {I18n.t('deliver_to')}
        </Text>
      )}
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
          placeholder={cName ? cName : I18n.t('name')}
          value={cName ? cName : null}
          leftIcon={() =>
            cName ? (
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
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
        />
        <Input
          editable={editMode}
          placeholder={cEmail ? cEmail : I18n.t('email')}
          value={cEmail ? cEmail : null}
          leftIcon={() =>
            cEmail ? (
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
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="email-address"
        />
        <Input
          editable={editMode}
          value={cMobile ? cMobile : null}
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
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="number-pad"
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
            width: '94.5%',
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
        {!validate.isEmpty(cAddress) && (
          <>
            <Input
              editable={false}
              placeholder={cArea ? cArea : I18n.t('area')}
              value={cAddress ? cArea : null}
              leftIcon={() =>
                cArea ? (
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
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={cBlock ? cBlock : I18n.t('block')}
              value={cBlock ? cBlock : null}
              leftIcon={() =>
                cBlock ? (
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
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={cStreet ? cStreet : I18n.t('street')}
              value={cStreet ? cStreet : null}
              leftIcon={() =>
                cStreet ? (
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
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={cBuilding ? cBuilding : I18n.t('building_no')}
              value={cBuilding ? cBuilding : null}
              leftIcon={() =>
                cBuilding ? (
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
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
          </>
        )}
        <Input
          spellCheck={true}
          editable={editMode}
          placeholder={cNotes ? cNotes : I18n.t('additional_information')}
          value={cNotes ? cNotes : null}
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
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
          // multiline={true}
          numberOfLines={3}
        />
      </View>
      <View style={{backgroundColor: 'white', margin: 15, padding: 15}}>
        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <CheckBox
            containerStyle={{
              backgroundColor: 'transparent',
              alignItems: 'baseline',
              justifyContent: 'center',
              borderWidth: 0,
            }}
            title={I18n.t('agree_on_conditions_and_terms')}
            iconType="material"
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            checked={checked}
            checkedColor={colors.btn_bg_theme_color}
            uncheckedColor={colors.btn_bg_theme_color}
            style={{color: colors.btn_bg_theme_color}}
            onPress={() => setChecked(!checked)}
            textStyle={{fontFamily: text.font, paddingTop: 5}}
          />
          <Icon
            name="book"
            type="octicon"
            size={iconSizes.smaller}
            hitSlop={{
              top: iconSizes.smaller,
              bottom: iconSizes.smaller,
              left: iconSizes.smaller,
              right: iconSizes.smaller,
            }}
            onPress={() => navigation.navigate('TermAndCondition')}
          />
        </View>
        <FastImage
          source={images.knet}
          style={{width: 200, height: 50, alignSelf: 'center', marginTop: 10}}
        />
        {settings.payment_method === 'ibooky' && (
          <>
            <DesigneratBtn
              disabled={!checked}
              handleClick={() => {
                dispatch({
                  type: CREATE_IBOOKEY_PAYMENT_URL,
                  payload: {
                    name: cName,
                    email: cEmail,
                    mobile: cMobile,
                    address: cAddress,
                    block: cBlock,
                    building: cBuilding,
                    street: cStreet,
                    area: cArea,
                    area_id,
                    country_id,
                    cart,
                    price: parseFloat(total),
                    net_price: parseFloat(grossTotal),
                    shipment_fees: parseFloat(shipmentFees),
                    cash_on_delivery: false,
                    receive_on_branch: pickup,
                    branch_id: branch ? branch.id : null,
                    coupon_id: !isEmpty(coupon) ? coupon.id : null,
                    discount: !isEmpty(coupon) ? coupon.value : 0,
                    notes: cNotes,
                    payment_method: 'knet',
                  },
                });
              }}
              title={I18n.t('pay_knet')}
            />
            <DesigneratBtn
              disabled={!checked}
              handleClick={() => {
                dispatch({
                  type: CREATE_IBOOKEY_PAYMENT_URL,
                  payload: {
                    name: cName,
                    email: cEmail,
                    mobile: cMobile,
                    address: cAddress,
                    block: cBlock,
                    building: cBuilding,
                    street: cStreet,
                    area: cArea,
                    area_id,
                    country_id,
                    cart,
                    price: parseFloat(total),
                    net_price: parseFloat(grossTotal),
                    shipment_fees: parseFloat(shipmentFees),
                    cash_on_delivery: false,
                    receive_on_branch: pickup,
                    branch_id: branch ? branch.id : null,
                    coupon_id: !isEmpty(coupon) ? coupon.id : null,
                    discount: !isEmpty(coupon) ? coupon.value : 0,
                    notes: cNotes,
                    payment_method: 'credit',
                  },
                });
              }}
              title={I18n.t('pay_credit')}
            />
          </>
        )}
        {settings.payment_method === 'myfatoorah' && (
          <DesigneratBtn
            disabled={!checked}
            handleClick={() => {
              dispatch({
                type: CREATE_MYFATOORAH_PAYMENT_URL,
                payload: {
                  name: cName,
                  email: cEmail,
                  mobile: cMobile,
                  address: cAddress,
                  block: cBlock,
                  building: cBuilding,
                  street: cStreet,
                  area: cArea,
                  area_id,
                  country_id,
                  cart,
                  price: total,
                  net_price: grossTotal,
                  shipment_fees: shipmentFees,
                  cash_on_delivery: false,
                  receive_on_branch: pickup,
                  branch_id: branch ? branch.id : null,
                  coupon_id: !isEmpty(coupon) ? coupon.id : null,
                  discount: !isEmpty(coupon) ? coupon.value : 0,
                  notes: cNotes,
                  payment_method: isIOS
                    ? 'IOS - My Fatoorah'
                    : 'Android - My Fatoorah',
                },
              });
            }}
            title={I18n.t('pay_online_with_my_fatorah')}
          />
        )}
        {settings.payment_method === 'tap' && (
          <DesingeratBtn
            disabled={!checked}
            handleClick={() => {
              dispatch({
                type: CREATE_TAP_PAYMENT_URL,
                payload: {
                  name: cName,
                  email: cEmail,
                  mobile: cMobile,
                  address: cAddress,
                  block: cBlock,
                  building: cBuilding,
                  street: cStreet,
                  area: cArea,
                  area_id,
                  country_id,
                  cart,
                  price: total,
                  net_price: grossTotal,
                  shipment_fees: shipmentFees,
                  cash_on_delivery: false,
                  receive_on_branch: pickup,
                  branch_id: branch ? branch.id : null,
                  coupon_id: !isEmpty(coupon) ? coupon.id : null,
                  discount: !isEmpty(coupon) ? coupon.value : 0,
                  notes: cNotes,
                  payment_method: isIOS ? 'IOS - TAP' : 'Android - TAP',
                },
              });
            }}
            title={I18n.t('pay_online_with_tap')}
          />
        )}
        {settings.cash_on_delivery && (
          <View>
            <Pressable
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              handleClick={() => setIsVisible(true)}>
              <View style={{flex: 0.9}}>
                <DesigneratBtn
                  disabled={!checked}
                  bg={themeColors.whatsapp}
                  handleClick={() => setIsVisible(true)}
                  title={I18n.t('cash_on_delivery') + '  ' + I18n.t('whatsapp')}
                />
              </View>
              <Icon
                name="whatsapp"
                type="font-awesome"
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                color={themeColors.whatsapp}
                size={iconSizes.small}
              />
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              handleClick={() => setIsVisible(true)}>
              <View style={{flex: 0.9}}>
                <DesigneratBtn
                  disabled={!checked}
                  handleClick={() => setIsVisible(true)}
                  title={I18n.t('cash_on_delivery')}
                />
              </View>
              <Icon
                name="money"
                type="font-awesome"
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                color={settings.colors.icon_theme_color}
                size={iconSizes.smaller}
              />
            </Pressable>
          </View>
        )}
        <DesingeratBtn
          handleClick={() => dispatch(clearCart())}
          title={I18n.t('clear_cart')}
          bgColor="#DD4132"
          // bgColor={adjustColor(colors.btn_bg_theme_color, 15)}
          marginTop={15}
        />
      </View>
    </View>
  );
};

export default DesigneratCartListConfirmationScreen;

DesigneratCartListConfirmationScreen.propTypes = {
  cart: PropTypes.array.isRequired,
  auth: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  discount: PropTypes.number,
  shipment_notes: PropTypes.string.isRequired,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired,
  shipmentFees: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({});
