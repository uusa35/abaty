import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {text, width} from '../../constants';
import I18n from '../../I18n';
import CartListConfirmationScreen from '../../components/widgets/cart/CartListConfirmationScreen';

const CartConfirmationScreen = ({
  cart,
  shipment_notes,
  shipmentFees,
  navigation,
  auth,
  guest,
  coupon,
  colors,
  grossTotal,
  country,
  COD,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
      }}>
      <ScrollView
        style={{width: '95%'}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 50}}>
        {!validate.isEmpty(cart) ? (
          <CartListConfirmationScreen
            cart={cart}
            shipmentCountry={country}
            auth={auth}
            guest={guest}
            grossTotal={grossTotal}
            shipmentFees={shipmentFees}
            discount={coupon ? coupon.value : null}
            shipment_notes={shipment_notes}
            editModeDefault={false}
            coupon={coupon ? coupon : null}
            navigation={navigation}
            COD={COD && country.is_local}
          />
        ) : (
          <View
            style={{
              marginTop: 300,
              width: width - 50,
              alignSelf: 'center',
            }}>
            <Button
              raised
              title={I18n.t('no_items')}
              type="outline"
              containerStyle={{marginBottom: 20}}
              titleStyle={{fontFamily: text.font}}
            />
            <Button
              onPress={() => navigation.navigate('Home')}
              raised
              title={I18n.t('shop_now')}
              type="outline"
              containerStyle={{marginBottom: 20}}
              titleStyle={{
                fontFamily: text.font,
                color: colors.main_text_theme_color,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    colors: state.settings.colors,
    total: state.total,
    shipment_notes: state.settings.shipment_notes,
    auth: state.auth,
    country: state.country,
    guest: state.guest,
    coupon: state.coupon,
    grossTotal: state.grossTotal,
    shipmentFees: state.shipmentFees,
    COD: state.settings.cash_on_delivery,
  };
}

export default connect(mapStateToProps)(CartConfirmationScreen);

CartConfirmationScreen.propTypes = {
  cart: PropTypes.array.isRequired,
  shipment_notes: PropTypes.string,
  total: PropTypes.number,
  colors: PropTypes.object,
  country: PropTypes.object,
  auth: PropTypes.object,
  guest: PropTypes.bool,
  coupon: PropTypes.object,
  shipmentFees: PropTypes.number,
};

const styles = StyleSheet.create({});
