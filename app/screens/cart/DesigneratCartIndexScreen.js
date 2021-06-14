import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import validate from 'validate.js';
import {text, width, height} from '../../constants/sizes';
import I18n from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import LottieView from 'lottie-react-native';
import {animations} from '../../constants/animations';
import {View as Animating} from 'react-native-animatable';
import EmptyListWidget from '../../components/Lists/EmptyListWidget';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratCartList from '../../components/widgets/cart/DesigneratCartList';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import widgetStyles from '../../components/widgets/widgetStyles';
import {themeColors} from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import {images} from '../../constants/images';
import {EXPO, DESIGNERAT} from '../../../app.json';

const DesigneratCartIndexScreen = () => {
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

  useEffect(() => {}, [cart]);

  return (
    <BgContainer showImage={false}>
      {!validate.isEmpty(cart) && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: themeColors.desinerat.lightGray,
          }}>
          <KeyBoardContainer>
            <DesigneratCartList
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
        </View>
      )}
      {validate.isEmpty(cart) && (
        <ImageBackground
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            flex: 1,
            padding: 20,
          }}
          source={
            DESIGNERAT
              ? images.cartBg
              : EXPO
              ? {uri: settings.main_bg}
              : images.whiteBg
          }
          imageStyle={{resizeMode: 'repeat', opacity: 0.2}}>
          <LottieView
            source={EXPO ? animations.emptyCart : animations.cart}
            autoPlay
            loop
            style={{
              alignSelf: 'center',
              width: width / 2,
              height: width / 2,
              marginBottom: 20,
            }}
            enableMergePathsAndroidForKitKatAndAbove
          />
          <Animating
            animation="bounceIn"
            easing="ease-out"
            useNativeDriver={true}>
            <Text
              style={[
                widgetStyles.headerThree,
                {marginBottom: 20, color: colors.header_one_theme_color},
              ]}>
              {I18n.t('cart_is_empty')}
            </Text>
            <DesigneratBtn
              handleClick={() => navigation.navigate('FavoriteProductIndex')}
              title={I18n.t('add_from_favorite_list')}
            />
            <DesigneratBtn
              handleClick={() => navigation.navigate('Home')}
              marginTop={20}
              title={I18n.t('continue_shopping')}
            />
          </Animating>
        </ImageBackground>
      )}
    </BgContainer>
  );
};

export default DesigneratCartIndexScreen;

const styles = StyleSheet.create({});
