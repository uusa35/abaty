import React, {useContext, useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {text, height} from '../../../constants/sizes';
import {showCountryModal} from '../../../redux/actions';
import {
  clearCart,
  getCoupon,
  storeOrderCashOnDelivery,
  storeOrderMyFatoorah,
  storeOrderTap,
} from '../../../redux/actions/cart';
import {Button, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, round, isNull} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {MALLR, ABATI, HOMEKEY, PAYMENT} from './../../../../app';
import validate from 'validate.js';
import {useDispatch} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';

const CartListConfirmationScreen = ({
  cart,
  shipmentCountry,
  grossTotal,
  shipment_notes,
  shipmentFees,
  guest,
  discount = 0,
  editModeDefault = true,
  coupon = {},
  COD,
}) => {
  const dispatch = useDispatch();
  const {colors, total} = useContext(GlobalValuesContext);
  const navigation = useNavigation();
  const {
    cName,
    cEmail,
    cMobile,
    cAddress,
    cNotes,
    cArea,
  } = navigation.state.params;
  const [name, setName] = useState(cName);
  const [email, setEmail] = useState(cEmail);
  const [mobile, setMobile] = useState(cMobile);
  const [address, setAddress] = useState(cAddress);
  const [notes, setNotes] = useState(cNotes);
  const [area, setArea] = useState(cArea);
  const [editMode, setEditMode] = useState(editModeDefault);

  const handleCashOnDelivery = useCallback(() => {
    return Alert.alert(
      I18n.t('order_confirmation'),
      I18n.t('order_cash_on_delivery_confirmation'),
      [
        {
          text: I18n.t('cancel'),
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: I18n.t('confirm_cash_on_delivery'),
          onPress: () =>
            dispatch(
              storeOrderCashOnDelivery({
                name,
                email,
                mobile,
                address,
                area,
                country_id: shipmentCountry.id,
                coupon_id: !isNull(coupon) ? coupon.id : null,
                cart,
                price: total,
                net_price: grossTotal,
                shipment_fees: shipmentFees,
                cash_on_delivery: COD,
                discount,
                payment_method: isIOS
                  ? 'Iphone - CASH ON DELIVERY'
                  : 'Android - CASH ON DELIVERY',
              }),
            ),
        },
      ],
      {cancelable: true},
    );
  });

  return (
    <View style={{width: '100%', padding: '5%', alignSelf: 'center'}}>
      <View
        useNativeDriver={true}
        animation="bounceInLeft"
        easing="ease-out"
        style={{flexDirection: 'column', width: '100%'}}>
        {map(cart, (item, i) => {
          return (
            <ProductItem
              item={item}
              key={i}
              editMode={editMode}
              qty={item.qty}
              notes={item.notes}
            />
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignText: 'center',
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 20,
            borderTopWidth: 0.5,
            borderTopColor: 'lightgrey',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('total')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {round(total, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
        </View>
        {shipmentFees > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignText: 'center',
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('shipment_fees_per_piece')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.header_one_theme_color,
                }}>
                {round(shipmentCountry.fixed_shipment_charge, 2)}
              </Text>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.header_one_theme_color,
                }}>
                {I18n.t('kwd')}
              </Text>
            </View>
          </View>
        ) : null}
        {discount && discount > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignText: 'center',
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('discount')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: 'red',
                }}>
                {round(discount, 2)}
              </Text>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: 'red',
                }}>
                {I18n.t('kwd')}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignText: 'center',
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 20,
            borderTopWidth: 0.5,
            borderTopColor: 'lightgrey',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('grossTotal')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {round(grossTotal, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
        </View>
        {guest ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Button
              onPress={() => navigation.navigate('Login')}
              raised
              containerStyle={{flex: 0.5, marginBottom: 10, margin: 5}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black',
              }}
              title={I18n.t('login')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
            <Button
              onPress={() => navigation.navigate('Register')}
              raised
              containerStyle={{flex: 0.5, marginBottom: 10, margin: 5}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black',
              }}
              title={I18n.t('register')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
          </View>
        ) : null}
        <View>
          {/*<Button*/}
          {/*  raised*/}
          {/*  title={shipment_notes}*/}
          {/*  type="outline"*/}
          {/*  containerStyle={{marginBottom: 20}}*/}
          {/*  titleStyle={{*/}
          {/*    fontFamily: text.font,*/}
          {/*    color: colors.header_one_theme_color,*/}
          {/*  }}*/}
          {/*/>*/}
          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <Input
              editable={editMode}
              placeholder={name ? name : I18n.t('name')}
              value={name ? name : null}
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
              onChangeText={(name) => setName(name)}
            />
            <Input
              editable={editMode}
              placeholder={email ? email : I18n.t('email')}
              value={email ? email : null}
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
              onChangeText={(email) => setEmail(email)}
            />
            <Input
              editable={editMode}
              textContentType="telephoneNumber"
              placeholder={mobile ? mobile : I18n.t('mobile')}
              value={mobile ? mobile : null}
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
              onChangeText={(mobile) => setMobile(mobile)}
            />
            <TouchableOpacity
              onPress={() => {
                editMode ? dispatch(showCountryModal()) : null;
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
                {shipmentCountry.slug}
              </Text>
            </TouchableOpacity>
            {area ? (
              <Input
                editable={editMode}
                placeholder={area ? area : I18n.t('area')}
                value={area ? area : null}
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
                onChangeText={(area) => setArea(area)}
              />
            ) : null}
            <Input
              editable={editMode}
              placeholder={address ? address : I18n.t('full_address')}
              value={address ? address : null}
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
              onChangeText={(address) => setAddress(address)}
            />
            <Input
              spellCheck={true}
              editable={editMode}
              placeholder={notes ? notes : I18n.t('additional_information')}
              value={notes ? notes : null}
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
                textAlign: isRTL ? 'right' : 'left',
              }}
              shake={true}
              keyboardType="default"
              multiline={true}
              numberOfLines={3}
              onChangeText={(notes) => setNotes(notes)}
            />
            {!discount > 0 && editMode ? (
              <View
                style={{
                  padding: 20,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: text.font,
                    fontSize: text.medium,
                    textAlign: 'center',
                    paddingBottom: 10,
                  }}>
                  {I18n.t('have_coupon')}
                </Text>
                <Input
                  placeholder={I18n.t('coupon')}
                  value={code ? code : null}
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
                  onChangeText={(code) => setCode(code)}
                />
                <Button
                  raised
                  containerStyle={{marginBottom: 10, width: '90%%'}}
                  buttonStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                    borderRadius: 0,
                  }}
                  title={I18n.t('add_coupon')}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.btn_text_theme_color,
                  }}
                  onPress={() => dispatch(getCoupon(code))}
                />
              </View>
            ) : null}
          </View>
          {editMode ? (
            <Button
              raised
              containerStyle={{marginBottom: 10, width: '100%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                borderRadius: 0,
              }}
              title={I18n.t('confirm_information')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color,
              }}
              onPress={() =>
                navigation.navigate('CartConfirmation', {
                  params: name,
                  email,
                  mobile,
                  address,
                  country_id: shipmentCountry.id,
                  notes,
                })
              }
            />
          ) : (
            <View>
              {COD ? (
                <Button
                  raised
                  containerStyle={{marginBottom: 10, width: '100%'}}
                  buttonStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                    borderRadius: 0,
                  }}
                  title={I18n.t('cash_on_delivery')}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.btn_text_theme_color,
                  }}
                  onPress={() => handleCashOnDelivery()}
                />
              ) : null}
              {PAYMENT === 'MYFATOORAH' ? (
                <Button
                  raised
                  containerStyle={{marginBottom: 10, width: '100%'}}
                  buttonStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                    borderRadius: 0,
                  }}
                  title={I18n.t('go_to_payment_my_fatoorah')}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.btn_text_theme_color,
                  }}
                  onPress={() =>
                    dispatch(
                      storeOrderMyFatoorah({
                        name,
                        email,
                        mobile,
                        address,
                        area,
                        country_id: shipmentCountry.id,
                        coupon_id: !isNull(coupon) ? coupon.id : null,
                        cart,
                        price: total,
                        net_price: grossTotal,
                        shipment_fees: shipmentFees,
                        cash_on_delivery: false,
                        discount,
                        payment_method: isIOS
                          ? 'IOS - My Fatoorah'
                          : 'Android - My Fatoorah',
                      }),
                    )
                  }
                />
              ) : null}
              {PAYMENT === 'TAP' ? (
                <Button
                  raised
                  containerStyle={{marginBottom: 10, width: '100%'}}
                  buttonStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                    borderRadius: 0,
                  }}
                  title={I18n.t('go_to_payment_tap')}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.btn_text_theme_color,
                  }}
                  onPress={() =>
                    dispatch(
                      storeOrderTap({
                        name,
                        email,
                        mobile,
                        address,
                        area,
                        country_id: shipmentCountry.id,
                        coupon_id: !isNull(coupon) ? coupon.id : null,
                        cart,
                        price: total,
                        net_price: grossTotal,
                        shipment_fees: shipmentFees,
                        cash_on_delivery: false,
                        discount,
                        payment_method: isIOS
                          ? 'Iphone - Tap Payment'
                          : 'Android - Tap Payment',
                      }),
                    )
                  }
                />
              ) : null}
            </View>
          )}
        </View>
      </View>
      <Button
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        title={I18n.t('clear_cart')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
        onPress={() => dispatch(clearCart())}
      />
    </View>
  );
};

export default CartListConfirmationScreen;

CartListConfirmationScreen.propTypes = {
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
