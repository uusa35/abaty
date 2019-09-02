import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getService} from '../../../redux/actions';
import {getProductConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {images, text} from '../../../constants';
import TagWidget from './../TagWidget';

const ServiceWidget = ({element, showName = false, dispatch, colors}) => {
  const {currency_symbol, exchange_rate, token} = useContext(
    GlobalValuesContext
  );
  return (
    <TouchableOpacity
      key={element.id}
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
          height: 285,
          justifyContent: 'space-evenly'
        }
      ]}
      onPress={() =>
        dispatch(getService({id: element.id, api_token: token ? token : null}))
      }>
      <ImageBackground
        source={{
          uri: element.thumb
        }}
        loadingIndicatorSource={images.logo}
        imageStyle={styles.imageStyling}
        style={styles.image}
        resizeMode="contain">
        <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
          {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
          {element.isOnSale ? (
            <TagWidget tagName="under_sale" bgColor="red" />
          ) : null}
          {element.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
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
            {element.name.substring(0, 20)}
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
              {getProductConvertedFinalPrice(element.finalPrice, exchange_rate)}
            </Text>
            <Text style={widgetStyles.elementName}>{currency_symbol}</Text>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ServiceWidget;

ServiceWidget.propTypes = {
  element: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: 173,
    height: 230
  }
});
