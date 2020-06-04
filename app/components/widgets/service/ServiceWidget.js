import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getService} from '../../../redux/actions/service';
import {getConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import TagWidget from './../TagWidget';
import {useDispatch, useSelector} from 'react-redux';

const ServiceWidget = ({element, showName = false}) => {
  const {colors, currency_symbol, exchange_rate} = useContext(
    GlobalValuesContext,
  );
  const {token} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={widgetStyles.productServiceWidget}
      onPress={() =>
        dispatch(
          getService({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        )
      }>
      <ImageBackground
        source={{
          uri: element.thumb,
        }}
        loadingIndicatorSource={images.logo}
        imageStyle={styles.imageStyling}
        style={styles.image}
        resizeMode="stretch">
        <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
          {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
          {element.isOnSale ? (
            <TagWidget tagName="under_sale" bgColor="red" />
          ) : null}
          {element.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
        </View>
      </ImageBackground>
      {showName ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              widgetStyles.elementName,
              {
                textAlign: 'center',
                fontSize: text.medium,
                color: colors.header_tow_theme_color,
              },
            ]}>
            {element.name.substring(0, 20)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.medium,
                  paddingRight: 5,
                  paddingLeft: 5,
                },
              ]}>
              {getConvertedFinalPrice(element.finalPrice, exchange_rate)}
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
};

const styles = StyleSheet.create({
  image: {
    // width: 190,
    width: '100%',
    height: 240,
  },
});
