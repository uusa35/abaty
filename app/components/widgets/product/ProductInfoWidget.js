import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getProduct} from '../../../redux/actions';
import {Icon, Button} from 'react-native-elements';
import {getProductConvertedFinalPrice} from '../../../helpers';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {text, width} from './../../../constants';
import I18n from './../../../I18n';
import FastImage from 'react-native-fast-image';
import ProductInfoWidgetMainTitle from './ProductInfoWidgetMainTitle';
import ProductInfoWidgetBtns from './ProductInfoWidgetBtns';

const ProductInfoWidget = ({element, currency}) => {
  console.log('element', element);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
      }}>
      <ProductInfoWidgetMainTitle element={element} currency={currency} />
      <ProductInfoWidgetBtns element={element} />
    </ScrollView>
  );
};

export default React.memo(ProductInfoWidget);

ProductInfoWidget.propTypes = {
  element: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  productTitle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    color: 'black',
    fontFamily: text.font
  }
});
