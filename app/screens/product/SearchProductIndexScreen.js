import React, {useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import validate from 'validate.js';

const SearchProductIndexScreen = ({searchProducts, searchParams}) => {
  const [currentElements, setCurrentElements] = useState([]);
  console.log('SearchproductIndexScreen');
  useMemo(() => {
    if (validate.isEmpty(currentElements)) {
      setCurrentElements(searchProducts);
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
    searchProducts: state.searchProducts,
    searchParams: state.searchParams,
    colors: state.settings.colors,
  };
}

export default connect(mapStateToProps)(SearchProductIndexScreen);

SearchProductIndexScreen.propTypes = {
  searchProducts: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
