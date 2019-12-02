import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../../components/widgets/product/ProductList';
import PropTypes from 'prop-types';

const ProductIndexScreen = ({products, searchParams}) => {
  console.log('searchParams', searchParams);
  console.log('products', products);
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
    products: state.products,
    searchParams: state.searchParams,
    colors: state.settings.colors,
  };
}

export default connect(mapStateToProps)(ProductIndexScreen);

ProductIndexScreen.propTypes = {
  products: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
