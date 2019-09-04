import React, {Fragment, useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getClassified, getProduct} from '../../../redux/actions';
import {
  getConvertedFinalPrice,
  getProductConvertedFinalPrice
} from '../../../helpers';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {images, text, width} from '../../../constants';
import TagWidget from './../TagWidget';
import ClassifiedWidgetProperties from './ClassifiedWidgetProperties';

const ClassifiedWidget = ({element, showName = false, dispatch, colors}) => {
  const {currency_symbol, exchange_rate, token} = useContext(
    GlobalValuesContext
  );
  return (
    <TouchableOpacity
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: '100%',
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 20,
          marginTop: 5,
          marginBottom: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'center'
        }
      ]}
      onPress={() =>
        dispatch(
          getClassified({id: element.id, api_token: token ? token : null})
        )
      }>
      <ImageBackground
        source={{
          uri: element.thumb
        }}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        imageStyle={{
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
        resizeMode="stretch">
        <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
          {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
        </View>
      </ImageBackground>
      {showName ? (
        <ClassifiedWidgetProperties
          element={element}
          colors={colors}
          exchange_rate={exchange_rate}
          currency_symbol={currency_symbol}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ClassifiedWidget;

ClassifiedWidget.propTypes = {
  element: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 230
  }
});
