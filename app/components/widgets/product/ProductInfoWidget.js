import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
import ProductInfoWidgetMainTitle from './ProductInfoWidgetMainTitle';
import ProductInfoWidgetBtns from './ProductInfoWidgetBtns';

const ProductInfoWidget = ({element}) => {
  return (
    <View
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
      }}>
      <ProductInfoWidgetMainTitle element={element} />
      {element.show_attribute ? (
        <ProductInfoWidgetBtns element={element} />
      ) : null}
    </View>
  );
};

export default ProductInfoWidget;

ProductInfoWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
