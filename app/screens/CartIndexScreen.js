import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import validate from 'validate.js';
import {NavContext} from './../redux/NavContext';
import PropTypes from 'prop-types';
import CartList from '../components/widgets/cart/CartList';
import {text, width} from '../constants';
import {Button} from 'react-native-elements';
import I18n from '../I18n';
class CartIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipmentCountry: {}
    };
  }

  componentDidMount() {
    const {country} = this.props;
    this.setState({
      shipmentCountry: country
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {total, coupon, guest, cart, auth, grossTotal} = this.props;
    if (nextProps.country.id !== this.state.shipmentCountry.id) {
      this.setState({
        shipmentCountry: nextProps.country
      });
    }

    return (
      nextProps.country.id !== this.state.shipmentCountry.id ||
      nextProps.guest !== guest ||
      nextProps.coupon.id !== coupon.id ||
      nextProps.cart.length !== cart.length ||
      nextProps.cart[0].product_id !== this.props.cart[0].product_id ||
      nextProps.cart > 0 ||
      nextProps.auth.id !== auth.id ||
      nextProps.total !== total ||
      nextProps.grossTotal !== grossTotal
    );
  }

  render() {
    const {
      cart,
      shipment_notes,
      navigation,
      auth,
      guest,
      coupon,
      colors,
      grossTotal
    } = this.props;
    const {shipmentCountry} = this.state;
    return (
      <NavContext.Provider value={{navigation}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%'
          }}>
          <ScrollView
            style={{width: '95%'}}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10
            }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 50}}>
            {!validate.isEmpty(cart) ? (
              <CartList
                cart={cart}
                shipmentCountry={shipmentCountry}
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
                  alignSelf: 'center'
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
                    color: colors.main_text_theme_color
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    colors: state.settings.colors,
    total: state.total,
    grossTotal: state.grossTotal,
    shipment_notes: state.settings.shipment_notes,
    auth: state.auth,
    country: state.country,
    guest: state.guest,
    coupon: state.coupon
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
  coupon: PropTypes.object
};

const styles = StyleSheet.create({});
