import React, {useContext, useEffect, useState, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {images, text} from '../../../constants';
import {getProductConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {round} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {Icon} from 'react-native-elements';
import {toggleFavorite, toggleProductFavorite} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';

const ProductInfoWidgetMainTitle = ({element}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors, token, guest, exchange_rate, currency_symbol} = useContext(
    GlobalValuesContext
  );
  const [favorite, setFavorite] = useState(element.isFavorite);

  return (
    <View
      style={{
        padding: 0,
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
      <FastImage
        source={{uri: element.user.thumb}}
        style={{
          width: 60,
          height: 60,
          borderRadius: 60 / 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2
        }}
        loadingIndicatorSource={images.logo}
      />
      <View style={{width: '75%'}}>
        <Text
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            fontSize: 18,
            color: colors.header_one_theme_color,
            textAlign: 'left',
            fontFamily: text.font,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2
          }}>
          {element.name}
        </Text>
        <Text
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            paddingBottom: 5,
            fontSize: 10,
            color: colors.header_one_theme_color,
            textAlign: 'left',
            fontFamily: text.font
          }}>
          {element.user.slug}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            minWidth: '60%'
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
              {currency_symbol}
            </Text>
          </View>
          {element.isOnSale ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.productTitle, {color: 'red'}]}>
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
      <View style={{justifyContent: 'flex-end'}}>
        {!guest ? (
          <Icon
            onPress={() => {
              setFavorite(!favorite);
              dispatch(
                toggleProductFavorite({
                  api_token: token,
                  product_id: element.id
                })
              );
            }}
            name={favorite ? 'star' : 'staro'}
            type="antdesign"
            size={25}
            underlayColor="transparent"
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            color="#FCD12A"
          />
        ) : null}
      </View>
    </View>
  );
};

export default ProductInfoWidgetMainTitle;

ProductInfoWidgetMainTitle.propTypes = {
  element: PropTypes.object.isRequired
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
