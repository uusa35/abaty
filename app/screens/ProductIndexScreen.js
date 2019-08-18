import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {
  productsSelector,
  searchParamsSelector
} from '../redux/selectors/collections';
import {colorsSelector} from '../redux/selectors/collection';

const ProductIndexScreen = ({products, searchParams, dispatch, colors}) => {
  return (
    <ProductList
      products={products}
      dispatch={dispatch}
      colros={colors}
      showName={true}
      searchElements={searchParams}
    />
  );
};

function mapStateToProps(state) {
  return {
    products: productsSelector(state),
    searchParams: searchParamsSelector(state),
    colors: colorsSelector(state)
  };
}

export default connect(mapStateToProps)(ProductIndexScreen);

ProductIndexScreen.propTypes = {
  products: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
