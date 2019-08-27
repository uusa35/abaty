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

const CollectionWidget = ({element, showName = false, dispatch}) => {
  const {currency_symbol, exchange_rate, colors, token} = useContext(
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
        dispatch(getProduct({id: element.id, api_token: token ? token : null}))
      }>
      <ImageBackground
        source={{
          uri: element.thumb
        }}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="stretch"></ImageBackground>
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
            {element.slug.substring(0, 20)}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CollectionWidget;

CollectionWidget.propTypes = {
  element: PropTypes.object.isRequired,
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
