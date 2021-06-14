import React, {useContext, useState, useEffect, Fragment, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {iconSizes, text} from '../../../constants/sizes';
import {
  getCoupon,
  setBranch,
  setGrossTotal,
  setShipmentFees,
} from '../../../redux/actions/cart';
import {Input, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, first} from 'lodash';
import {togglePickup} from '../../../redux/actions/cart';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import {REGISTER_AS_CLIENT} from '../../../redux/actions/types';
import {useNavigation} from '@react-navigation/native';
import DesigneratProductItem from '../product/DesigneratProductItem';
import widgetStyles from '../widgetStyles';
import {width} from '../../../constants';
import DesigneratCartPriceSummary from './DesigneratCartPriceSummary';
import {themeColors} from '../../../constants/colors';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants/images';
import DesigneratBtn from '../../widgets/Button/DesigneratBtn';

const DesigneratCartList = ({
  shipmentCountry,
  shipment_notes = null,
  editModeDefault = true,
  coupon,
  selectedArea,
}) => {
  const dispatch = useDispatch();
  const {colors, cartLength} = useContext(GlobalValuesContext);
  const {
    cart,
    auth,
    guest,
    settings,
    pickup,
    shipmentFees,
    grossTotal,
    total,
    branch,
  } = useSelector(state => state);
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
  const [currentGrossTotal, setCurrentGrossTotal] = useState();
  const [currentShipmentFees, setCurrentShipmentFees] = useState();
  const [selectedBranch, setSelectedBranch] = useState({});

  useEffect(() => {
    setEmail(auth.email);
    setName(auth.name);
    setMobile(auth.mobile);
    setAddress(auth.address);
  }, [auth]);

  useMemo(() => {
    if (
      pickup &&
      settings.pickupFromBranch &&
      !settings.multiCartMerchant &&
      shipmentCountry.is_local &&
      !validate.isEmpty(cart[0].element.user.branches)
    ) {
      setCurrentGrossTotal(
        parseFloat(parseFloat(grossTotal) - parseFloat(shipmentFees)),
      );
      setCurrentShipmentFees(0);
      setSelectedBranch(first(cart[0].element.user.branches));
    } else {
      setCurrentGrossTotal(
        parseFloat(parseFloat(total) + parseFloat(shipmentFees)),
      );
      setCurrentShipmentFees(parseFloat(shipmentFees));
      setSelectedBranch({});
    }
  }, [pickup]);

  useMemo(() => {
    dispatch(setBranch(selectedBranch));
  }, [selectedBranch]);

  const handleRegisterClick = () => {
    dispatch({type: REGISTER_AS_CLIENT, payload: {isClient: true}});
  };

  const handleNext = () => {
    dispatch(setGrossTotal(currentGrossTotal));
    dispatch(setShipmentFees(currentShipmentFees));
    return navigate('CartIndexForm');
  };

  useEffect(() => {
    setCurrentGrossTotal(grossTotal);
    setShipmentFees(shipmentFees);
  }, [cart, grossTotal, shipmentFees]);

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
        <Text style={widgetStyles.headerThree}>{I18n.t('cart')}</Text>
        <Text style={widgetStyles.headerThree}>{I18n.t('step')} (1/3)</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <Text style={widgetStyles.headerThree}>
          {I18n.t('products_number')} ({cartLength})
        </Text>
        <Text style={widgetStyles.headerThree}>
          {grossTotal} {I18n.t('kwd')}
        </Text>
      </View>
      {map(cart, (item, i) => {
        return (
          <DesigneratProductItem
            item={item}
            timeData={item.type === 'service' ? item.timeData : null}
            key={item.cart_id}
            editMode={editMode}
            qty={item.qty}
            notes={item.notes}
          />
        );
      })}
      <View
        style={[
          widgetStyles.panelContent,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigate('FavoriteProductIndex')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Icon name="heart" type="antdesign" size={iconSizes.smaller} />
          <Text
            style={[
              widgetStyles.headerThree,
              {paddingLeft: 20, paddingRight: 20},
            ]}>
            {I18n.t('add_from_favorite_list')}
          </Text>
        </TouchableOpacity>
        <Icon
          name={`chevron-${isRTL ? 'left' : 'right'}`}
          type="evilicon"
          size={iconSizes.medium}
          color={colors.icon_theme_color}
        />
      </View>

      <View
        style={[
          widgetStyles.panelContent,
          {
            paddingBottom: 20,
          },
        ]}>
        <Text
          style={[widgetStyles.headerThree, {textAlign: 'left', padding: 15}]}>
          {I18n.t('have_coupon')}
        </Text>
        <Input
          placeholder={I18n.t('coupon')}
          value={code ? code : null}
          containerStyle={{height: 50}}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          shake={true}
          keyboardType="default"
          onChangeText={code => setCode(code)}
        />
        <DesigneratBtn
          handleClick={() => dispatch(getCoupon(code))}
          title={I18n.t('add_coupon')}
          marginTop={20}
        />
      </View>
      <DesigneratCartPriceSummary
        shipmentFees={currentShipmentFees}
        grossTotal={currentGrossTotal}
      />

      {settings.pickupFromBranch &&
        !settings.multiCartMerchant &&
        shipmentCountry.is_local &&
        !validate.isEmpty(cart[0].element.user.branches) && (
          <Fragment>
            <Pressable
              style={[
                widgetStyles.panelContent,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 15,
                },
              ]}
              onPress={() => {
                dispatch(togglePickup(!pickup));
                // dispatch(setBranches(cart[0].element.user.branches))
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Icon
                  type={'material'}
                  name={pickup ? 'radio-button-checked' : 'radio-button-off'}
                  color={
                    pickup
                      ? colors.btn_bg_theme_color
                      : themeColors.desinerat.lightGray
                  }
                  size={iconSizes.smaller}
                />
                <Text
                  style={[
                    widgetStyles.headerThree,
                    {paddingLeft: 20, paddingRight: 20},
                  ]}>
                  {I18n.t('pickup_from_branch')}
                </Text>
              </View>
              <Icon
                onPress={() => dispatch(togglePickup(!pickup))}
                name={`chevron-${isRTL ? 'left' : 'right'}`}
                type="evilicon"
                size={iconSizes.medium}
                color={colors.btn_bg_theme_color}
              />
            </Pressable>

            {pickup && (
              <View
                style={[
                  widgetStyles.panelContent,
                  {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 15,
                  },
                ]}>
                <Text
                  style={[
                    widgetStyles.headerThree,
                    {textAlign: 'left', lineHeight: 25, marginBottom: 10},
                  ]}>
                  {I18n.t('choose_branch_from_list')}
                </Text>
                {cart[0].element.user.branches.map(b => (
                  <Pressable
                    key={b.id}
                    style={{
                      flexDirection: 'row',
                      // flex: 1,
                      minHeight: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setSelectedBranch(b)}>
                    <View
                      style={{
                        flex: 1,
                        paddingTop: 15,
                        paddingBottom: 15,
                        borderTopWidth: 0.5,
                        borderTopColor: colors.btn_bg_theme_color,
                      }}>
                      <Text
                        style={[
                          widgetStyles.headerThree,
                          {textAlign: 'left', lineHeight: 30},
                        ]}>
                        {b.name}
                      </Text>
                      <Text
                        style={[
                          widgetStyles.headerThree,
                          {textAlign: 'left', lineHeight: 30},
                        ]}>
                        {I18n.t('mobile')} : {b.mobile}
                      </Text>
                      <Text
                        style={[
                          widgetStyles.headerFour,
                          {textAlign: 'left', lineHeight: 30},
                        ]}>
                        {I18n.t('address')} : {b.address}
                      </Text>
                    </View>
                    {!validate.isEmpty(selectedBranch) &&
                      selectedBranch.id === b.id &&
                      pickup && (
                        <Icon
                          name="check"
                          type="antdesign"
                          color={
                            selectedBranch.id === branch.id
                              ? colors.btn_bg_theme_color
                              : 'white'
                          }
                          size={iconSizes.smaller}
                          style={{
                            borderWidth: 0.5,
                            borderColor: themeColors.desinerat.darkGray,
                          }}
                        />
                      )}
                  </Pressable>
                ))}
              </View>
            )}
          </Fragment>
        )}
      {settings.pickupFromBranch && !settings.multiCartMerchant && (
        <Pressable
          style={[
            widgetStyles.panelContent,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            },
          ]}
          onPress={() => {
            dispatch(togglePickup(false));
            // dispatch(setBranches(cart[0].element.user.branches))
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Icon
              type={'material'}
              name={!pickup ? 'radio-button-checked' : 'radio-button-off'}
              color={
                !pickup
                  ? colors.btn_bg_theme_color
                  : themeColors.desinerat.lightGray
              }
              size={iconSizes.smaller}
            />
            <Text
              style={[
                widgetStyles.headerThree,
                {paddingLeft: 20, paddingRight: 20},
              ]}>
              {I18n.t('delivery')}
            </Text>
          </View>
          <Icon
            onPress={() => dispatch(togglePickup(false))}
            name={`chevron-${isRTL ? 'left' : 'right'}`}
            type="evilicon"
            size={iconSizes.medium}
            color={colors.btn_bg_theme_color}
          />
        </Pressable>
      )}
      {guest ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            margin: 15,
          }}>
          <DesigneratBtn
            handleClick={() => navigate('Login')}
            title={I18n.t('login')}
            width={'45%'}
          />
          <DesigneratBtn
            handleClick={() => handleRegisterClick()}
            title={I18n.t('register')}
            width={'45%'}
          />
        </View>
      ) : null}
      {guest ? (
        <DesigneratBtn
          title={I18n.t('continue_as_guest')}
          handleClick={() => navigate('CartGuest')}
          marginTop={20}
        />
      ) : (
        <DesigneratBtn
          title={I18n.t('continue')}
          handleClick={() => handleNext()}
          marginTop={20}
        />
      )}
    </View>
  );
};

export default DesigneratCartList;

DesigneratCartList.propTypes = {
  coupon: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  shipment_notes: PropTypes.string,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({});
