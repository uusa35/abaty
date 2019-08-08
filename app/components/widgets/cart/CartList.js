import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS, text} from '../../../constants';
import {
    clearCart,
    getCoupon,
    showCountryModal, showLoginModal,
    submitCart
} from '../../../redux/actions';
import {Button, Input} from 'react-native-elements';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {map, round, isNull} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {useNavigation} from "react-navigation-hooks";

const CartList = ({
  cart,
  shipmentCountry,
  auth,
  shipment_notes,
  guest,
  editModeDefault = true,
  coupon
}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors, total, grossTotal} = useContext(GlobalValuesContext);
  const { navigate } = useNavigation();
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
  const [code, setCode] = useState(
    !validate.isEmpty(coupon) ? coupon.code : ''
  );
  const [editMode, setEditMode] = useState(editModeDefault);

  useEffect(() => {
    setEmail(auth.email);
    setName(auth.name);
    setMobile(auth.mobile);
    setAddress(auth.address);
    setNotes(auth.description);
  }, [auth]);

  return (
    <View style={{width: '100%'}}>
      <View
        animation="bounceInLeft"
        easing="ease-out"
        style={{flexDirection: 'column', width: '100%'}}>
        {map(cart, (item, i) => {
          return (
            <ProductItem
              element={item.element}
              timeData={item.type === 'service' ? item.timeData : null}
              key={item.element.id}
              editMode={editMode}
              qty={item.qty}
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
            borderTopColor: 'lightgrey'
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color
            }}>
            {I18n.t('total')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
              }}>
              {round(total, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignText: 'center',
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 20
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color
            }}>
            {I18n.t('shipment_fees')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
              }}>
              {round(shipmentCountry.fixed_shipment_charge, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
        </View>
        {coupon && coupon.value > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignText: 'center',
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 20
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
              }}>
              {I18n.t('discount')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: 'red'
                }}>
                {round(coupon.value, 2)}
              </Text>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: 'red'
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
            borderTopColor: 'lightgrey'
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color
            }}>
            {I18n.t('grossTotal')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
              }}>
              {round(grossTotal, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color
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
              width: '100%'
            }}>
            <Button
              onPress={() => dispatch(showLoginModal())}
              raised
              containerStyle={{flex: 0.5, marginBottom: 10, margin: 5}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black'
              }}
              title={I18n.t('login')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
            <Button
              onPress={() => navigate('Register')}
              raised
              containerStyle={{flex: 0.5, marginBottom: 10, margin: 5}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black'
              }}
              title={I18n.t('register')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
          </View>
        ) : null}
        <View>
          <Button
            raised
            title={shipment_notes}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{
              fontFamily: text.font,
              color: colors.header_one_theme_color
            }}
          />
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
                marginBottom: 20
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left'
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
                marginBottom: 20
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left'
              }}
              shake={true}
              keyboardType="number-pad"
              onChangeText={mobile => setMobile(mobile)}
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
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.large,
                  textAlign: isRTL ? 'right' : 'left',
                  color: colors.main_theme_color
                }}>
                {shipmentCountry.slug}
              </Text>
            </TouchableOpacity>
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
              onChangeText={address => setAddress(address)}
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
                height: 80
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left'
              }}
              shake={true}
              keyboardType="default"
              multiline={true}
              numberOfLines={3}
              onChangeText={notes => setNotes(notes)}
            />
            {coupon && editMode ? (
              <View
                style={{
                  padding: 20,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    fontFamily: text.font,
                    fontSize: text.medium,
                    textAlign: 'center',
                    paddingBottom: 10
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
                    marginBottom: 20
                  }}
                  inputStyle={{
                    fontFamily: text.font,
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                  shake={true}
                  keyboardType="default"
                  onChangeText={code => setCode(code)}
                />
                <Button
                  raised
                  containerStyle={{marginBottom: 10, width: '90%%'}}
                  buttonStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                    borderRadius: 0
                  }}
                  title={I18n.t('add_coupon')}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.btn_text_theme_color
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
                borderRadius: 0
              }}
              title={I18n.t('confirm_information')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color
              }}
              onPress={() =>
                dispatch(
                  submitCart({
                    name,
                    email,
                    mobile,
                    address,
                    country_id: shipmentCountry.id,
                    notes
                  })
                )
              }
            />
          ) : (
            <View>
              <Button
                raised
                containerStyle={{marginBottom: 10, width: '100%'}}
                buttonStyle={{
                  backgroundColor: colors.btn_bg_theme_color,
                  borderRadius: 0
                }}
                title={I18n.t('go_to_payment_my_fatoorah')}
                titleStyle={{
                  fontFamily: text.font,
                  color: colors.btn_text_theme_color
                }}
                onPress={() =>
                  dispatch({
                    type: actions.CREATE_MYFATOORAH_PAYMENT_URL,
                    payload: {
                      name,
                      email,
                      mobile,
                      address,
                      country_id: shipmentCountry.id,
                      coupon_id: !isNull(coupon) ? coupon.id : 0,
                      cart,
                      total,
                      grossTotal,
                      shipment_fees: shipmentCountry.fixed_shipment_charge,
                      discount,
                      payment_method: isIOS
                        ? 'IOS - My Fatoorah'
                        : 'Android - My Fatoorah'
                    }
                  })
                }
              />
              <Button
                raised
                containerStyle={{marginBottom: 10, width: '100%'}}
                buttonStyle={{
                  backgroundColor: colors.btn_bg_theme_color,
                  borderRadius: 0
                }}
                title={I18n.t('go_to_payment_tap')}
                titleStyle={{
                  fontFamily: text.font,
                  color: colors.btn_text_theme_color
                }}
                onPress={() =>
                  dispatch({
                    type: actions.CREATE_TAP_PAYMENT_URL,
                    payload: {
                      name,
                      email,
                      mobile,
                      address,
                      country_id: shipmentCountry.id,
                      coupon_id: !isNull(coupon) ? coupon.id : 0,
                      cart,
                      total,
                      grossTotal,
                      shipment_fees: shipmentCountry.fixed_shipment_charge,
                      discount,
                      payment_method: isIOS
                        ? 'IOS - My Fatoorah'
                        : 'Android - My Fatoorah'
                    }
                  })
                }
              />
            </View>
          )}
        </View>
      </View>
      <Button
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0
        }}
        title={I18n.t('clear_cart')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
        }}
        onPress={() => dispatch(clearCart())}
      />
    </View>
  );
};

export default React.memo(CartList);

CartList.propTypes = {
  cart: PropTypes.array.isRequired,
  coupon: PropTypes.object,
  auth: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  shipment_notes: PropTypes.string.isRequired,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({});
