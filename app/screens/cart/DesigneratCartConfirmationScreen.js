import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {width} from '../../constants/sizes';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import BgContainer from '../../components/containers/BgContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratCartListConfirmationScreen from '../../components/widgets/cart/DesigneratCartListConfirmationScreen';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import DesingeratBtn from '../../components/widgets/Button/DesigneratBtn';

const DesigneratCartConfirmationScreen = () => {
  const {
    cart,
    shipmentCountry,
    shipmentFees,
    settings,
    auth,
    guest,
    coupon,
    grossTotal,
  } = useSelector(state => state);
  const navigation = useNavigation();

  return (
    <BgContainer showImage={false}>
      <KeyBoardContainer>
        {!validate.isEmpty(cart) ? (
          <DesigneratCartListConfirmationScreen
            cart={cart}
            shipmentCountry={shipmentCountry}
            auth={auth}
            guest={guest}
            grossTotal={grossTotal}
            shipmentFees={shipmentFees}
            discount={coupon ? coupon.value : null}
            shipment_notes={settings.shipment_notes}
            editModeDefault={false}
            coupon={coupon ? coupon : null}
            COD={settings.cash_on_delivery && shipmentCountry.is_local}
          />
        ) : (
          <View
            style={{
              marginTop: 300,
              width: width - 50,
              alignSelf: 'center',
            }}>
            <DesingeratBtn
              handleClick={() => null}
              bg={false}
              title={I18n.t('no_items')}
            />
            <DesigneratBtn
              title={I18n.t('shop_now')}
              handleClick={() => navigation.navigate('Home')}
            />
          </View>
        )}
      </KeyBoardContainer>
    </BgContainer>
  );
};

export default DesigneratCartConfirmationScreen;

const styles = StyleSheet.create({});
