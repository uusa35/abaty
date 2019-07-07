import React, {useContext} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {images, text} from '../../../constants';
import {getProductConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {round} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductInfoWidgetMainTitle = ({element, currency}) => {
  const {colors} = useContext(GlobalValuesContext);
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
                getProductConvertedFinalPrice(
                  element.price,
                  currency.exchange_rate
                ),
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
              {currency.currency_symbol}
            </Text>
          </View>
          {element.isOnSale ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.productTitle}>
                {round(
                  getProductConvertedFinalPrice(
                    element.sale_price,
                    currency.exchange_rate
                  ),
                  2
                )}
              </Text>
              <Text style={styles.productTitle}>
                {currency.currency_symbol}
              </Text>
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
  currency: PropTypes.object.isRequired
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
