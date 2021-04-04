import React, {useContext, useState, useEffect, Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {iconSizes, text} from '../../../constants/sizes';
import {showCountryModal} from '../../../redux/actions';
import {clearCart, getCoupon, submitCart} from '../../../redux/actions/cart';
import {
  Button,
  Input,
  CheckBox,
  Icon,
  ListItem,
  Badge,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, round, isNull} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import {
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
  REGISTER_AS_CLIENT,
} from '../../../redux/actions/types';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from 'react-navigation-hooks';
import DesigneratProductItem from '../product/DesigneratProductItem';
import widgetStyles from '../widgetStyles';
import {toggleProductFavorite} from '../../../redux/actions/product';
import {width} from '../../../constants';
import DesigneratBtn from '../Button/DesigneratBtn';
import DesigneratCartPriceSummary from './DesigneratCartPriceSummary';

const DesigneratCartList = ({
  shipmentCountry,
  shipment_notes = null,
  editModeDefault = true,
  coupon,
  selectedArea,
  shipmentFees,
}) => {
  const dispatch = useDispatch();
  const {
    colors,
    total,
    grossTotal,
    exchange_rate,
    currency_symbol,
    cartLength,
  } = useContext(GlobalValuesContext);
  const {cart, auth, guest, country} = useSelector((state) => state);
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
  }, [auth]);

  const handleRegisterClick = () => {
    return navigate('Register');
  };

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
          onChangeText={(code) => setCode(code)}
        />
        <DesigneratBtn
          handleClick={() => dispatch(getCoupon(code))}
          title={I18n.t('add_coupon')}
          marginTop={20}
        />
      </View>

      <DesigneratCartPriceSummary />

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
            handleClick={() => navigate('Register')}
            title={I18n.t('register')}
            width={'45%'}
          />
        </View>
      ) : null}
      <DesigneratBtn
        title={I18n.t('continue')}
        handleClick={() =>
          guest ? handleRegisterClick() : navigate('CartIndexForm')
        }
        marginTop={20}
      />
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
