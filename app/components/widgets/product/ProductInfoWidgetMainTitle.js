import React, {useContext} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {images, text} from '../../../constants';
import {getProductConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {round} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductInfoWidgetMainTitle = ({element, currency}) => {
  const {colors, country} = useContext(GlobalValuesContext);
  const {symbol, exchange_rate} = country.currency;
  return (
    <View
      style={{
        padding: 5,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <FastImage
        source={{uri: element.thumb}}
        style={{width: 60, height: 60}}
        loadingIndicatorSource={images.logo}
      />
      <View>
        <Text
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            fontSize: 20,
            color: colors.header_one_theme_color,
            textAlign: 'left',
            fontFamily: text.font
          }}>
          {element.name}
        </Text>
        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.productTitle,
                {
                  color: element.isOnSale ? 'grey' : 'black',
                  textDecorationLine: element.isOnSale ? 'line-through' : null
                }
              ]}>
              {round(
                getProductConvertedFinalPrice(element.price, exchange_rate),
                2
              )}
            </Text>
            <Text
              style={[
                styles.productTitle,
                {
                  color: element.isOnSale ? 'grey' : 'black',
                  textDecorationLine: element.isOnSale ? 'line-through' : null
                }
              ]}>
              {symbol}
            </Text>
          </View>
          {element.isOnSale ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.productTitle}>
                {round(
                  getProductConvertedFinalPrice(
                    element.sale_price,
                    exchange_rate
                  ),
                  2
                )}
              </Text>
              <Text style={styles.productTitle}>{symbol}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductInfoWidgetMainTitle);

ProductInfoWidgetMainTitle.propTypes = {
  element: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  productTitle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
    fontFamily: text.font
  }
});
