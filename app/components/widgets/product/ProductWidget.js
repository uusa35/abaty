import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getProduct} from '../../../redux/actions';
import {Icon, Tooltip, Button, Text} from 'react-native-elements';
import {getProductConvertedFinalPrice} from '../../../helpers';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {images, text} from '../../../constants';
import I18n, {isRTL} from '../../../I18n';
import TagWidget from './TagWidget';

const ProductWidget = ({product, showName = false}) => {
  const {dispatch} = useContext(DispatchContext);
  const {currency_symbol, exchange_rate} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      key={product.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: '48%',
          maxWidth: 190,
          margin: 5,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 5,
          height: 250
        }
      ]}
      onPress={() => dispatch(getProduct(product.id))}>
      <ImageBackground
        source={{
          uri: product.thumb
        }}
        loadingIndicatorSource={images.logo}
        imageStyle={styles.imageStyling}
        style={styles.image}
        resizeMode="cover">
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
                textAlign: 'left',
                paddingBottom: 0,
                paddingRight: 10,
                paddingLeft: 10,
                fontSize: text.small
              }
            ]}>
            {product.name} - {product.id}
          </Text>
          <Text
            style={[
              widgetStyles.elementName,
              {
                textAlign: 'left',
                paddingTop: 0,
                paddingRight: 10,
                paddingLeft: 10,
                fontSize: text.medium
              }
            ]}>
            {getProductConvertedFinalPrice(product.finalPrice, exchange_rate)}
            {currency_symbol}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(ProductWidget);

ProductWidget.propTypes = {
  product: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180
  },
  imageStyling: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
});
