import React, {useState, useEffect, useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ProductList} from '../../components/LazyLoadingComponents/productComponents';
import PropTypes from 'prop-types';
import {getAllProducts} from '../../redux/actions/product';
import {productsSelector} from '../../redux/selectors/collections';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';
import validate from 'validate.js';
import {first} from 'lodash';

const ProductIndexAllScreen = ({
  dispatch,
  searchParams,
  products,
  isLoadingContent,
}) => {
  const ref = useRef();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    if (validate.isEmpty(searchParams)) {
      dispatch(getAllProducts());
    }
  }, []);

  useEffect(() => {
    console.log('fired here');
    if (!validate.isEmpty(currentProducts)) {
      ref.current = first(currentProducts).id;
      if (
        ref.current !== first(products).id &&
        validate.isEmpty(searchParams)
      ) {
        dispatch(getAllProducts());
        setCurrentProducts(products);
      }
    }
  }, [products]);

  useMemo(() => {
    if (!validate.isEmpty(products)) {
      setCurrentProducts(products);
    }
  }, [currentProducts, products]);

  // useEffect(() => {
  //   if (products !== currentProducts) {
  //     dispatch(getAllProducts());
  //     setCurrentProducts(products);
  //   }
  // }, [currentProducts]);

  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
      <ProductList
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
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ProductIndexAllScreen);

ProductIndexAllScreen.propTypes = {
  products: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
