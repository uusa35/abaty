import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';

const BrandShowScreen = ({brand, searchParams, dispatch}) => {
  return (
    <ProductList
      products={brand.products}
      showName={true}
      dispatch={dispatch}
      searchElements={searchParams}
    />
  );
};

function mapStateToProps(state) {
  return {
    brand: state.brand,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(BrandShowScreen);

BrandShowScreen.propTypes = {
  brand: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired
};
const styles = StyleSheet.create({});
