import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getProduct} from '../../../redux/actions';
import {getProductConvertedFinalPrice} from '../../../helpers';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {images, text} from '../../../constants';
import TagWidget from './../TagWidget';

const ProductWidget = ({product, showName = false, dispatch}) => {
  const {currency_symbol, exchange_rate, colors, token} = useContext(
    GlobalValuesContext
  );
  return (
    <TouchableOpacity
      key={product.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: '48%',
          maxWidth: 175,
          margin: 5,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 5,
          height: 285
        }
      ]}
      onPress={() =>
        dispatch(getProduct({id: product.id, api_token: token ? token : null}))
      }>
      <ImageBackground
        source={{
          uri: product.thumb
        }}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="stretch">
        <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
          {product.exclusive ? <TagWidget tagName="exclusive" /> : null}
          {product.isOnSale ? (
            <TagWidget tagName="under_sale" bgColor="red" />
          ) : null}
          {product.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
        </View>
      </ImageBackground>
      {showName ? (
        <View>
          <Text
            style={[
              widgetStyles.elementName,
              {
                textAlign: 'center',
                fontSize: text.medium,
                color: colors.header_tow_theme_color
              }
            ]}>
            {product.name.substring(0, 20)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.medium,
                  paddingRight: 5,
                  paddingLeft: 5
                }
              ]}>
              {getProductConvertedFinalPrice(product.finalPrice, exchange_rate)}
            </Text>
            <Text style={widgetStyles.elementName}>{currency_symbol}</Text>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ProductWidget;

ProductWidget.propTypes = {
  product: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({
  image: {
    width: 175,
    height: 230
  }
});
