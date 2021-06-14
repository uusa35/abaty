import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import validate from 'validate.js';
import CartList from '../../components/widgets/cart/CartList';
import {text, width, height} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import LottieView from 'lottie-react-native';
import {animations} from '../../constants/animations';
import {View as Animating} from 'react-native-animatable';
import {EXPO, ABATI} from './../../../app';
import EmptyListWidget from '../../components/Lists/EmptyListWidget';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratCartList from '../../components/widgets/cart/DesigneratCartList';
import DesigneratCartForm from '../../components/widgets/cart/DesigneratCartForm';
import {themeColors} from '../../constants/colors';

const DesigneratCartFormIndexScreen = () => {
  const {
    cart,
    shipmentCountry,
    shipmentFees,
    settings,
    coupon,
    area,
    grossTotal,
  } = useSelector(state => state);
  const {colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  return (
    <BgContainer showImage={false}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: themeColors.desinerat.lightGray,
        }}>
        {!validate.isEmpty(cart) ? (
          <KeyBoardContainer>
            <DesigneratCartForm
              shipmentCountry={shipmentCountry}
              shipmentFees={shipmentFees}
              selectedArea={area}
              grossTotal={grossTotal}
              discount={coupon.value}
              shipment_notes={settings.shipment_notes}
              editModeDefault={true}
              coupon={coupon}
            />
          </KeyBoardContainer>
        ) : (
          <View
            style={{
              paddingTop: '30%',
              backgroundColor: 'white',
              width: width / 1.1,
            }}>
            {!ABATI ? (
              <LottieView
                source={EXPO ? animations.emptyCart : animations.cart}
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
            ) : (
              <EmptyListWidget emptyImage="emptyOrder" />
            )}
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
            {EXPO && (
              <LottieView
                source={animations.cart}
                autoPlay
                loop
                resizeMode="cover"
                style={{
                  alignSelf: 'center',
                  width: width / 1.3,
                  height: width / 1.3,
                }}
                enableMergePathsAndroidForKitKatAndAbove
              />
            )}
          </View>
        )}
      </View>
    </BgContainer>
  );
};

export default DesigneratCartFormIndexScreen;

const styles = StyleSheet.create({});
