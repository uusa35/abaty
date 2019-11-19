import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ProductList} from '../../components/LazyLoadingComponents/productComponents';
import PropTypes from 'prop-types';
import {getAllProducts} from '../../redux/actions/product';
import {productsSelector} from '../../redux/selectors/collections';
import {colorsSelector} from '../../redux/selectors/collection';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';

const ProductIndexAllScreen = ({
  dispatch,
  products,
  colors,
  isLoadingContent,
}) => {
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    if (products !== currentProducts) {
      dispatch(getAllProducts());
      setCurrentProducts(products);
    }
  }, [currentProducts]);

  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
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
    colors: colorsSelector(state),
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ProductIndexAllScreen);

ProductIndexAllScreen.propTypes = {
  products: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
