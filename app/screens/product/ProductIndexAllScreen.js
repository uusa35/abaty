import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ProductList} from '../../components/LazyLoadingComponents/productComponents';
import PropTypes from 'prop-types';
import {getAllProducts} from '../../redux/actions';
import {productsSelector} from '../../redux/selectors/collections';
import {colorsSelector} from '../../redux/selectors/collection';
import SimpleSpinner from '../../components/SimpleSpinner';

const ProductIndexAllScreen = ({dispatch, products, colors}) => {
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    if (products !== currentProducts) {
      dispatch(getAllProducts());
      setCurrentProducts(products);
    }
    console.log('firing useEffect ProductIndexAll');
  }, [currentProducts]);

  return (
    <React.Suspense fallback={<SimpleSpinner />}>
      <ProductList
        colors={colors}
        dispatch={dispatch}
        products={products}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showFooter={true}
        showRefresh={true}
      />
    </React.Suspense>
  );
};

function mapStateToProps(state) {
  return {
    products: productsSelector(state),
    colors: colorsSelector(state)
  };
}

export default connect(mapStateToProps)(ProductIndexAllScreen);

ProductIndexAllScreen.propTypes = {
  products: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
