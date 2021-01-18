import React, {useContext, Fragment} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, touchOpacity} from '../../../constants/sizes';
import TagWidget from './../TagWidget';
import I18n from './../../../I18n';
import FastImage from 'react-native-fast-image';
import {images} from '../../../constants/images';
import ImageLoaderContainer from '../ImageLoaderContainer';

const ProductWidget = ({
  element,
  showName = false,
  handleClickProductWidget,
  width = '48%',
}) => {
  const {currency_symbol, exchange_rate, colors} = useContext(
    GlobalValuesContext,
  );

  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={[widgetStyles.productServiceWidget, {width: width}]}
      onPress={() => handleClickProductWidget(element)}>
      <ImageBackground
        source={images.loading}
        style={{height: 240, width: '100%'}}>
        <Fragment>
          <ImageLoaderContainer
            img={element.thumb}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{flex: 1, position: 'absolute', bottom: 20, right: 0}}>
            {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
            {element.isOnSale ? (
              <TagWidget tagName="under_sale" bgColor="red" />
            ) : null}
            {element.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
            {!element.hasStock && (
              <TagWidget tagName="out_of_stock" bgColor="red" />
            )}
          </View>
        </Fragment>
      </ImageBackground>
      {showName && (
        <View
          style={{
            width: '100%',
            paddingTop: 5,
            paddingRight: 10,
            paddingLeft: 10,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.small,
                  color: colors.header_tow_theme_color,
                },
              ]}>
              {element.name.substring(0, 20)}
            </Text>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  fontSize: text.medium,
                  color: colors.header_one_theme_color,
                },
              ]}>
              {`${getConvertedFinalPrice(element.finalPrice, exchange_rate)}`}{' '}
              <Text
                style={[widgetStyles.elementName, {fontSize: text.smaller}]}>
                {currency_symbol}
              </Text>
            </Text>
          </View>
          {element.sku && (
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.small,
                  color: colors.header_tow_theme_color,
                },
              ]}>
              {`${I18n.t('sku')} :  ${element.sku.substring(0, 15)}`}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ProductWidget);

ProductWidget.propTypes = {
  element: PropTypes.object.isRequired,
  handleClickProductWidget: PropTypes.func.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: '100%',
    height: 240,
  },
});
