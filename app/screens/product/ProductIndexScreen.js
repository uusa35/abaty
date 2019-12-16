import React, {useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import validate from 'validate.js';

const ProductIndexScreen = ({products, searchParams}) => {
  const [currentElements, setCurrentElements] = useState([]);

  useMemo(() => {
    if (validate.isEmpty(currentElements)) {
      setCurrentElements(products);
    }
  }, [currentElements]);
  return (
    <ProductList
      products={currentElements}
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
