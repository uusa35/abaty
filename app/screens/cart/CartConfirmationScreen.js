import React, {useContext} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-elements';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {text, width} from '../../constants/sizes';
import I18n from '../../I18n';
import CartListConfirmationScreen from '../../components/widgets/cart/CartListConfirmationScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import BgContainer from '../../components/containers/BgContainer';
import {useNavigation} from '@react-navigation/native';

const CartConfirmationScreen = () => {
  const {cart, country, shipmentFees, settings, auth, guest, coupon} =
    useSelector(state => state);
  const {grossTotal, colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  return (
    <BgContainer>
      <KeyBoardContainer>
        {!validate.isEmpty(cart) ? (
          <CartListConfirmationScreen
            cart={cart}
            shipmentCountry={country}
            auth={auth}
            guest={guest}
            grossTotal={grossTotal}
            shipmentFees={shipmentFees}
            discount={coupon ? coupon.value : null}
            shipment_notes={settings.shipment_notes}
            editModeDefault={false}
            coupon={coupon ? coupon : null}
            COD={settings.cash_on_delivery && country.is_local}
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
      </KeyBoardContainer>
    </BgContainer>
  );
};

export default CartConfirmationScreen;

const styles = StyleSheet.create({});
