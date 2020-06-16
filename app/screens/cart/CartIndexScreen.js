import React, {useContext} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import CartList from '../../components/widgets/cart/CartList';
import {text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';
import LottieView from 'lottie-react-native';
import {animations} from '../../constants/animations';
import {View as Animating} from 'react-native-animatable';

const CartIndexScreen = () => {
  const {
    cart,
    country,
    shipmentFees,
    settings,
    auth,
    guest,
    coupon,
    area,
  } = useSelector((state) => state);
  const {grossTotal, colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  return (
    <BgContainer showImage={false}>
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
              shipment_notes={settings.shipment_notes}
              editModeDefault={true}
              coupon={coupon}
            />
          ) : (
            <View
              style={{
                marginTop: '40%',
                width: width - 50,
                alignSelf: 'center',
                flex: 1,
              }}>
              <LottieView
                source={animations.emptyCart}
                autoPlay
                loop
                resizeMode="cover"
                style={{
                  alignSelf: 'center',
                  width: width / 3,
                  height: width / 3,
                }}
                enableMergePathsAndroidForKitKatAndAbove
              />
              <Animating
                animation="bounceIn"
                easing="ease-out"
                useNativeDriver={true}>
                <Button
                  raised
                  title={I18n.t('no_items')}
                  type="outline"
                  containerStyle={{marginBottom: 20}}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.normal_text_theme_color,
                  }}
                  buttonStyle={{
                    borderColor: colors.btn_bg_theme_color,
                    color: colors.btn_bg_theme_color,
                  }}
                />
                <Button
                  onPress={() => navigation.navigate('Home')}
                  raised
                  title={I18n.t('shop_now')}
                  type="outline"
                  containerStyle={{marginBottom: 20}}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.normal_text_theme_color,
                  }}
                  buttonStyle={{
                    borderColor: colors.btn_bg_theme_color,
                    color: colors.btn_bg_theme_color,
                  }}
                />
              </Animating>
            </View>
          )}
        </ScrollView>
      </View>
    </BgContainer>
  );
};

export default CartIndexScreen;

const styles = StyleSheet.create({});
