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
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {images, text} from '../../../constants';
import TagWidget from './../TagWidget';

const ServiceWidget = ({service, showName = false}) => {
  const {dispatch} = useContext(DispatchContext);
  const {currency_symbol, exchange_rate, colors, token} = useContext(
    GlobalValuesContext
  );
  return (
    <TouchableOpacity
      key={service.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: 173,
          margin: 5,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 5,
          height: 285
        }
      ]}
      onPress={() =>
        dispatch(getService({id: service.id, api_token: token ? token : null}))
      }>
      <ImageBackground
        source={{
          uri: service.thumb
        }}
        loadingIndicatorSource={images.logo}
        imageStyle={styles.imageStyling}
        style={styles.image}
        resizeMode="contain">
        <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
          {service.exclusive ? <TagWidget tagName="exclusive" /> : null}
          {service.isOnSale ? (
            <TagWidget tagName="under_sale" bgColor="red" />
          ) : null}
          {service.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
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
            {service.name.substring(0, 20)}
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
              {getProductConvertedFinalPrice(service.finalPrice, exchange_rate)}
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
  service: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({
  image: {
    width: 173,
    height: 230
  },
  imageStyling: {
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10
  }
});
