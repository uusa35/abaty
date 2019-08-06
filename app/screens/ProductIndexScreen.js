import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {
  productsSelector,
  searchParamsSelector
} from '../redux/selectors/collections';

const ProductIndexScreen = ({products, searchParams}) => {
  return (
    <ProductList
      products={products}
      showName={true}
      searchElements={searchParams}
    />
  );
};

function mapStateToProps(state) {
  return {
    products: productsSelector(state),
    searchParams: searchParamsSelector(state)
  };
}

export default connect(mapStateToProps)(ProductIndexScreen);

ProductIndexScreen.propTypes = {
  products: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
