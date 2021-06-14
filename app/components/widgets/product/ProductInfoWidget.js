import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import ProductInfoWidgetMainTitle from './ProductInfoWidgetMainTitle';
import ProductInfoWidgetBtns from './ProductInfoWidgetBtns';
import {Button} from 'react-native-elements';
import I18n from './../../../I18n';
import {text} from '../../../constants/sizes';
import {useSelector} from 'react-redux';
import {themeColors} from '../../../constants/colors';

const ProductInfoWidget = ({
  element,
  setAddToCartStatus,
  setCartItem,
  handleAddToCart,
}) => {
  return (
    <View
      useNativeDriver={true}
      animation="bounceInLeft"
      easing="ease-out"
      // style={{ borderWidth : 0.5, backgroundColor : themeColors.desinerat.lightGray }}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
      }}>
      <ProductInfoWidgetMainTitle element={element} />
      {element.directPurchase && (
        <Button
          disabled={true}
          title={I18n.t('you_can_add_more_than_one_product_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            fontSize: text.medium,
            lineHeight: text.larger,
          }}
          buttonStyle={{
            backgroundColor: 'red',
            marginBottom: 15,
            marginTop: 10,
            width: '100%',
          }}
          containerStyle={{width: '95%', alignSelf: 'center'}}
        />
      )}
      {element.is_available && (
        <ProductInfoWidgetBtns
          element={element}
          setAddToCartStatus={setAddToCartStatus}
          setCartItem={setCartItem}
          handleAddToCart={handleAddToCart}
        />
      )}
    </View>
  );
};

export default React.memo(ProductInfoWidget);

ProductInfoWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
