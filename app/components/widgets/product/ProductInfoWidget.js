import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ProductInfoWidgetMainTitle from './ProductInfoWidgetMainTitle';
import ProductInfoWidgetBtns from './ProductInfoWidgetBtns';

const ProductInfoWidget = ({element}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
      }}>
      <ProductInfoWidgetMainTitle element={element} />
      <ProductInfoWidgetBtns element={element} />
    </ScrollView>
  );
};

export default ProductInfoWidget;

ProductInfoWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
