import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../../components/widgets/product/ProductList';

const BrandShowScreen = () => {
  const {brand, searchParams} = useSelector(state => state);
  return (
    <ProductList
      products={brand.products}
      showName={true}
      searchElements={searchParams}
    />
  );
};

export default BrandShowScreen;

const styles = StyleSheet.create({});
