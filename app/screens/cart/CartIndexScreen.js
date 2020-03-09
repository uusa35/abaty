import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import CartList from '../../components/widgets/cart/CartList';
import {text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
const CartIndexScreen = ({
  cart,
  country,
  shipmentFees,
  shipment_notes,
  navigation,
  auth,
  guest,
  coupon,
  colors,
  grossTotal,
  area,
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
          <CartList
            cart={cart}
            shipmentCountry={country}
            shipmentFees={shipmentFees}
            selectedArea={area}
            auth={auth}
            guest={guest}
            grossTotal={grossTotal}
            discount={coupon.value}
            shipment_notes={shipment_notes}
            editModeDefault={true}
            coupon={coupon}
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
    grossTotal: state.grossTotal,
    shipment_notes: state.settings.shipment_notes,
    auth: state.auth,
    country: state.country,
    shipmentFees: state.shipmentFees,
    area: state.area,
    guest: state.guest,
    coupon: state.coupon,
  };
}

export default connect(mapStateToProps)(CartIndexScreen);

CartIndexScreen.propTypes = {
  cart: PropTypes.array.isRequired,
  shipment_notes: PropTypes.string,
  total: PropTypes.number,
  colors: PropTypes.object,
  country: PropTypes.object,
  auth: PropTypes.object,
  guest: PropTypes.bool,
  coupon: PropTypes.object,
};

const styles = StyleSheet.create({});
